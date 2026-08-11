const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const range = xlsx.utils.decode_range(worksheet['!ref']);
console.log('Columns count:', range.e.c - range.s.c + 1);

let found = [];
for (let c = range.s.c; c <= range.e.c; c++) {
  for (let r = range.s.r; r <= range.e.r; r++) {
    const cell = worksheet[xlsx.utils.encode_cell({r: r, c: c})];
    if (cell && cell.t === 'n') {
      if (cell.v >= 46000 && cell.v <= 46500) {
        found.push({ r: r + 1, col: xlsx.utils.encode_col(c), val: cell.v, text: cell.w });
        if (found.length > 20) break;
      }
    }
  }
  if (found.length > 20) break;
}
console.log('Found cells in date serial number range (46000 - 46500):', found);
