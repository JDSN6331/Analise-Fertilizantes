const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const range = xlsx.utils.decode_range(worksheet['!ref']);

console.log('Printing raw cells for first data row (row 2, index 1) across all columns:');
for (let c = range.s.c; c <= range.e.c; c++) {
  const colLetter = xlsx.utils.encode_col(c);
  const headerCell = worksheet[xlsx.utils.encode_cell({r: 0, c: c})];
  const dataCell = worksheet[xlsx.utils.encode_cell({r: 1, c: c})];
  console.log(`Col ${colLetter} (Header: ${headerCell ? headerCell.v : 'N/A'}):`, dataCell ? { v: dataCell.v, t: dataCell.t, w: dataCell.w } : 'empty');
}
