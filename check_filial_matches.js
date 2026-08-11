const xlsx = require('xlsx');

// Load files
const workbookSales = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const sheetSales = workbookSales.Sheets[workbookSales.SheetNames[0]];
const rowsSales = xlsx.utils.sheet_to_json(sheetSales);

const workbookRegion = xlsx.readFile('FILIAL - MESOREGIAO v1.xlsx');
const sheetRegion = workbookRegion.Sheets[workbookRegion.SheetNames[0]];
const rowsRegion = xlsx.utils.sheet_to_json(sheetRegion);

// Build mesoregion mapping
const regionMap = {};
rowsRegion.forEach(r => {
  const filial = r['FILIAL'] ? r['FILIAL'].trim() : '';
  const mesoregion = r['MESOREGIÃO GEOGRÁFICA'] ? r['MESOREGIÃO GEOGRÁFICA'].trim() : '';
  const analista = r['ANALISTA'] ? r['ANALISTA'].trim() : '';
  if (filial) {
    regionMap[filial] = { mesoregion, analista };
  }
});

// Unique filiais in sales
const uniqueSalesFiliais = new Set();
rowsSales.forEach(r => {
  const filial = r['Filial'];
  // Skip total row or info row
  if (filial && typeof filial === 'string' && !filial.includes('Total') && !filial.includes('Filtros')) {
    uniqueSalesFiliais.add(filial.trim());
  }
});

console.log('Total unique filiais in Sales Sheet:', uniqueSalesFiliais.size);
console.log('Total unique filiais in Mesoregion Sheet:', Object.keys(regionMap).length);

console.log('\n--- Checking matches ---');
let matchedCount = 0;
let unmatchedList = [];
uniqueSalesFiliais.forEach(f => {
  if (regionMap[f]) {
    matchedCount++;
  } else {
    unmatchedList.push(f);
  }
});

console.log(`Matched filiais: ${matchedCount} / ${uniqueSalesFiliais.size}`);
console.log('Unmatched filiais in sales:', unmatchedList);
