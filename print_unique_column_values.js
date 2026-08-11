const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

console.log('Unique values of some columns:');

const columnsToInspect = [
  'DATA - Ano',
  'DATA - Mês',
  'Campanha',
  'Carteira',
  'Grupo - Nome'
];

columnsToInspect.forEach(col => {
  const vals = new Set();
  data.forEach(row => {
    if (row[col] !== undefined) {
      vals.add(row[col]);
    }
  });
  console.log(`Column "${col}" has ${vals.size} unique values. Samples:`, Array.from(vals).slice(0, 10));
});

// Let's print unique values for ALL columns just in case, but filter to show count and up to 5 samples
console.log('\n--- All Columns Summary ---');
const allKeys = new Set();
data.forEach(row => {
  Object.keys(row).forEach(key => allKeys.add(key));
});

allKeys.forEach(key => {
  const vals = new Set();
  data.forEach(row => {
    if (row[key] !== undefined) {
      vals.add(row[key]);
    }
  });
  console.log(`Column "${key}": ${vals.size} unique values. Samples:`, Array.from(vals).slice(0, 5));
});
