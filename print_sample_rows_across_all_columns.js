const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const range = xlsx.utils.decode_range(worksheet['!ref']);
console.log('Columns count:', range.e.c - range.s.c + 1);

const headers = [];
for (let c = range.s.c; c <= range.e.c; c++) {
  const headerCell = worksheet[xlsx.utils.encode_cell({r: 0, c: c})];
  headers.push(headerCell ? headerCell.v : `Col_${c}`);
}

console.log('Headers:', headers);

console.log('\n--- First 10 Rows ---');
for (let r = 1; r <= 10; r++) {
  const row = {};
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cell = worksheet[xlsx.utils.encode_cell({r: r, c: c})];
    row[headers[c]] = cell ? cell.v : undefined;
  }
  console.log(`Row ${r}:`, row);
}

// Check if any row has a different DATA - Ano or DATA - Mês value or if there are other fields.
// Wait! Let's count how many distinct values there are in each column, and print them.
console.log('\n--- Unique Values Count per Column ---');
for (let c = range.s.c; c <= range.e.c; c++) {
  const colName = headers[c];
  const uniqueVals = new Set();
  for (let r = 1; r <= range.e.r; r++) {
    const cell = worksheet[xlsx.utils.encode_cell({r: r, c: c})];
    if (cell && cell.v !== undefined) {
      uniqueVals.add(cell.v);
    }
  }
  console.log(`Column ${colName}: ${uniqueVals.size} unique values.`);
  if (uniqueVals.size < 10) {
    console.log(`  Samples:`, Array.from(uniqueVals));
  }
}
