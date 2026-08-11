const xlsx = require('xlsx');

const workbook = xlsx.readFile('FILIAL - MESOREGIAO v1.xlsx');
console.log('Sheets in FILIAL - MESOREGIAO:', workbook.SheetNames);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const range = xlsx.utils.decode_range(worksheet['!ref']);
console.log('Range:', range);

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
