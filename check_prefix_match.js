const xlsx = require('xlsx');

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

const regionMapByPrefix = {};
const regionMapByName = {};
rowsRegion.forEach(r => {
  const filial = r['FILIAL'] ? r['FILIAL'].trim() : '';
  const mesoregion = r['MESOREGIÃO GEOGRÁFICA'] ? r['MESOREGIÃO GEOGRÁFICA'].trim() : '';
  const analista = r['ANALISTA'] ? r['ANALISTA'].trim() : '';
  if (filial) {
    regionMapByName[filial] = { mesoregion, analista, originalName: filial };
    const prefix = getPrefix(filial);
    if (prefix) {
      regionMapByPrefix[prefix] = { mesoregion, analista, originalName: filial };
    }
  }
});

const uniqueSalesFiliais = new Set();
rowsSales.forEach(r => {
  const filial = r['Filial'];
  if (filial && typeof filial === 'string' && !filial.includes('Total') && !filial.includes('Filtros')) {
    uniqueSalesFiliais.add(filial.trim());
  }
});

console.log('--- Prefix Match Results ---');
uniqueSalesFiliais.forEach(f => {
  const exact = regionMapByName[f];
  if (exact) {
    console.log(`[EXACT] "${f}" -> "${exact.mesoregion}"`);
  } else {
    const prefix = getPrefix(f);
    const prefMatch = regionMapByPrefix[prefix];
    if (prefMatch) {
      console.log(`[PREFIX MATCH] "${f}" (prefix: ${prefix}) -> "${prefMatch.mesoregion}" (mapped to "${prefMatch.originalName}")`);
    } else {
      console.log(`[UNMATCHED] "${f}" (prefix: ${prefix})`);
    }
  }
});
