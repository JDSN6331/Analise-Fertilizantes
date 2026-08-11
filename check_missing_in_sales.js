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

const salesFiliaisPrefixes = new Set();
const salesFiliaisNames = new Set();
rowsSales.forEach(r => {
  const filial = r['Filial'];
  if (filial && typeof filial === 'string' && !filial.includes('Total') && !filial.includes('Filtros')) {
    salesFiliaisNames.add(filial.trim());
    salesFiliaisPrefixes.add(getPrefix(filial));
  }
});

console.log('Checking which filiais from Mesoregion sheet are missing in Sales sheet:');
rowsRegion.forEach(r => {
  const filial = r['FILIAL'] ? r['FILIAL'].trim() : '';
  if (filial) {
    const exact = salesFiliaisNames.has(filial);
    const prefix = getPrefix(filial);
    const prefixMatch = salesFiliaisPrefixes.has(prefix);
    if (!exact && !prefixMatch) {
      console.log(`Missing Filial: "${filial}" (not in sales sheet)`);
    } else if (!exact && prefixMatch) {
      console.log(`Name difference but matched by prefix: "${filial}" in Mesoregion vs Sales`);
    }
  }
});
