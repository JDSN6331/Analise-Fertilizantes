const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Print sheet range
console.log('Sheet Range:', worksheet['!ref']);

// Let's print columns A to Z for the first 5 rows
const range = xlsx.utils.decode_range(worksheet['!ref']);
console.log('Decoded Range:', range);

for (let r = 0; r <= 5; r++) {
  let rowStr = `Row ${r}: `;
  for (let c = 0; c <= 20; c++) {
    const cellAddress = xlsx.utils.encode_cell({ r: r, c: c });
    const cell = worksheet[cellAddress];
    const val = cell ? cell.v : '';
    const type = cell ? cell.t : '';
    rowStr += `[${cellAddress}: ${val} (${type})] `;
  }
  console.log(rowStr);
}
