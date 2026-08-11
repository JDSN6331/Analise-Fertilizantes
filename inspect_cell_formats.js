const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const range = xlsx.utils.decode_range(worksheet['!ref']);

console.log('Inspecting cell properties of row 2 and 3 for columns A and B:');
console.log('A2 cell:', worksheet['A2']);
console.log('B2 cell:', worksheet['B2']);
console.log('C2 cell:', worksheet['C2']);
console.log('P2 cell:', worksheet['P2']);

// Let's print some unique cell values from columns that could contain dates.
// Wait! Let's write a script to check if there is any date in the cells.
// We can check if any cell has a `t` of 'd' (Date type in SheetJS) or if its number format has date characters (e.g. 'y', 'm', 'd').
console.log('Searching for cells with Date type or Date formatting:');
let count = 0;
for (let r = range.s.r; r <= range.e.r; r++) {
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cellAddress = xlsx.utils.encode_cell({ r: r, c: c });
    const cell = worksheet[cellAddress];
    if (cell) {
      if (cell.t === 'd' || (cell.z && (cell.z.includes('y') || cell.z.includes('m') || cell.z.includes('d')))) {
        console.log(`Cell ${cellAddress} has date type or format:`, { v: cell.v, w: cell.w, t: cell.t, z: cell.z });
        count++;
        if (count >= 10) break;
      }
    }
  }
  if (count >= 10) break;
}
if (count === 0) {
  console.log('No cells found with Date type or date-like format strings.');
}
