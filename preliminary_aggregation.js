const xlsx = require('xlsx');
const fs = require('fs');

// Load files
const workbookSales = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const sheetSales = workbookSales.Sheets[workbookSales.SheetNames[0]];
const rowsSales = xlsx.utils.sheet_to_json(sheetSales);

const workbookRegion = xlsx.readFile('FILIAL - MESOREGIAO v1.xlsx');
const sheetRegion = workbookRegion.Sheets[workbookRegion.SheetNames[0]];
const rowsRegion = xlsx.utils.sheet_to_json(sheetRegion);

// Helper to get prefix (e.g. "L01" from "L01:Loja Matriz")
function getPrefix(name) {
  if (!name) return '';
  const idx = name.indexOf(':');
  if (idx !== -1) {
    return name.substring(0, idx).trim();
  }
  return name.trim();
}

// Region Mappings
const regionMapByPrefix = {};
const regionMapByName = {};
rowsRegion.forEach(r => {
  const filial = r['FILIAL'] ? r['FILIAL'].trim() : '';
  const mesoregion = r['MESOREGIÃO GEOGRÁFICA'] ? r['MESOREGIÃO GEOGRÁFICA'].trim() : '';
  const analista = r['ANALISTA'] ? r['ANALISTA'].trim() : '';
  if (filial) {
    regionMapByName[filial] = { mesoregion, analista };
    const prefix = getPrefix(filial);
    if (prefix) {
      regionMapByPrefix[prefix] = { mesoregion, analista };
    }
  }
});

// Aggregate data
let totalFaturamento = 0;
let totalEmbalagens = 0;
let totalKgL = 0;
let totalPedidos = 0;

const clientsSet = new Set();
const sellersSet = new Set();
const filiaisSet = new Set();

const filiaisAgg = {};
const sellersAgg = {};
const clientsAgg = {};
const productsAgg = {};
const groupsAgg = {};

rowsSales.forEach(r => {
  const filialRaw = r['Filial'];
  // Skip info rows or empty rows
  if (!filialRaw || typeof filialRaw !== 'string' || filialRaw.includes('Total') || filialRaw.includes('Filtros')) {
    return;
  }

  const fat = parseFloat(r['Faturamento']) || 0;
  const emb = parseFloat(r['Qtde Embalagem']) || 0;
  const kgl = parseFloat(r['Qtde Kg/L']) || 0;
  const clientName = r['Cliente - Nome'] ? r['Cliente - Nome'].trim() : 'Desconhecido';
  const clientMatricula = r['Cliente - Matrícula'] ? r['Cliente - Matrícula'].trim() : '';
  const clientKey = clientMatricula ? `${clientMatricula} - ${clientName}` : clientName;
  const seller = r['Vendedor'] ? r['Vendedor'].trim() : 'Desconhecido';
  const itemDesc = r['Item - Descrição'] ? r['Item - Descrição'].trim() : 'Desconhecido';
  const itemCode = r['Item'] ? r['Item'].toString().trim() : '';
  const productKey = itemCode ? `[${itemCode}] ${itemDesc}` : itemDesc;
  const group = r['Grupo - Nome'] ? r['Grupo - Nome'].trim() : 'Outros';

  totalFaturamento += fat;
  totalEmbalagens += emb;
  totalKgL += kgl;
  totalPedidos++;

  if (clientKey) clientsSet.add(clientKey);
  if (seller) sellersSet.add(seller);
  if (filialRaw) filiaisSet.add(filialRaw.trim());

  // Aggregate by filial
  const fKey = filialRaw.trim();
  if (!filiaisAgg[fKey]) {
    filiaisAgg[fKey] = { name: fKey, faturamento: 0, embalagens: 0, kgl: 0, pedidos: 0 };
  }
  filiaisAgg[fKey].faturamento += fat;
  filiaisAgg[fKey].embalagens += emb;
  filiaisAgg[fKey].kgl += kgl;
  filiaisAgg[fKey].pedidos++;

  // Aggregate by seller
  if (!sellersAgg[seller]) {
    sellersAgg[seller] = { name: seller, faturamento: 0, pedidos: 0, filial: fKey };
  }
  sellersAgg[seller].faturamento += fat;
  sellersAgg[seller].pedidos++;

  // Aggregate by client
  if (!clientsAgg[clientKey]) {
    clientsAgg[clientKey] = { name: clientKey, faturamento: 0, pedidos: 0, filial: fKey };
  }
  clientsAgg[clientKey].faturamento += fat;
  clientsAgg[clientKey].pedidos++;

  // Aggregate by product
  if (!productsAgg[productKey]) {
    productsAgg[productKey] = { name: productKey, faturamento: 0, embalagens: 0, kgl: 0, group };
  }
  productsAgg[productKey].faturamento += fat;
  productsAgg[productKey].embalagens += emb;
  productsAgg[productKey].kgl += kgl;

  // Aggregate by product group
  if (!groupsAgg[group]) {
    groupsAgg[group] = { name: group, faturamento: 0, embalagens: 0, kgl: 0 };
  }
  groupsAgg[group].faturamento += fat;
  groupsAgg[group].embalagens += emb;
  groupsAgg[group].kgl += kgl;
});

// Map filiais to mesoregions and aggregate mesoregions
const mesoregionsAgg = {};
const unmappedFiliais = [];

Object.values(filiaisAgg).forEach(f => {
  const mapping = regionMapByName[f.name] || regionMapByPrefix[getPrefix(f.name)];
  if (mapping) {
    f.mesoregion = mapping.mesoregion;
    f.analista = mapping.analista;
    
    if (!mesoregionsAgg[mapping.mesoregion]) {
      mesoregionsAgg[mapping.mesoregion] = {
        name: mapping.mesoregion,
        analista: mapping.analista,
        faturamento: 0,
        embalagens: 0,
        kgl: 0,
        pedidos: 0,
        filiais: []
      };
    }
    mesoregionsAgg[mapping.mesoregion].faturamento += f.faturamento;
    mesoregionsAgg[mapping.mesoregion].embalagens += f.embalagens;
    mesoregionsAgg[mapping.mesoregion].kgl += f.kgl;
    mesoregionsAgg[mapping.mesoregion].pedidos += f.pedidos;
    mesoregionsAgg[mapping.mesoregion].filiais.push(f);
  } else {
    f.mesoregion = 'Não Mapeado';
    f.analista = 'Sem Analista';
    unmappedFiliais.push(f);
  }
});

console.log('=== Total KPI Summary ===');
console.log('Total Faturamento:', totalFaturamento);
console.log('Total Pedidos:', totalPedidos);
console.log('Total Clientes:', clientsSet.size);
console.log('Total Vendedores:', sellersSet.size);
console.log('Total Filiais:', filiaisSet.size);

console.log('\n=== Mesoregions Faturamento ===');
Object.values(mesoregionsAgg).forEach(m => {
  console.log(`${m.name}: R$ ${m.faturamento.toFixed(2)} (${(m.faturamento/totalFaturamento*100).toFixed(2)}%) - ${m.filiais.length} filiais`);
});

console.log('\n=== Unmapped Filiais Faturamento ===');
let unmappedFat = 0;
unmappedFiliais.forEach(f => {
  unmappedFat += f.faturamento;
  console.log(`${f.name}: R$ ${f.faturamento.toFixed(2)} (${(f.faturamento/totalFaturamento*100).toFixed(2)}%)`);
});
console.log('Total Unmapped Faturamento:', unmappedFat.toFixed(2), `(${(unmappedFat/totalFaturamento*100).toFixed(2)}%)`);
