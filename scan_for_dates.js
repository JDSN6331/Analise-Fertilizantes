const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const range = xlsx.utils.decode_range(worksheet['!ref']);
console.log('Range:', worksheet['!ref']);

// Let's check if there's any data beyond column P
console.log('Checking columns from P to Z for any non-empty cells...');
let nonEmtpyColumns = new Set();
for (let r = range.s.r; r <= range.e.r; r++) {
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cellAddress = xlsx.utils.encode_cell({ r: r, c: c });
    const cell = worksheet[cellAddress];
    if (cell && cell.v !== undefined && cell.v !== '') {
      nonEmtpyColumns.add(xlsx.utils.encode_col(c));
    }
  }
}
console.log('Columns with data:', Array.from(nonEmtpyColumns).sort());

// Let's check if any column contains a date or a date string
console.log('Checking for date-like values in any cell...');
let dateMatches = [];
for (let r = range.s.r; r <= range.e.r; r++) {
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cellAddress = xlsx.utils.encode_cell({ r: r, c: c });
    const cell = worksheet[cellAddress];
    if (cell && cell.v !== undefined) {
      const valStr = String(cell.v);
      // Date format dd/mm/yyyy or yyyy-mm-dd or similar
      if (valStr.match(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/) || valStr.match(/\b\d{4}-\d{2}-\d{2}\b/)) {
        dateMatches.push({ cellAddress, val: cell.v });
        if (dateMatches.length >= 10) break;
      }
    }
  }
  if (dateMatches.length >= 10) break;
}
console.log('Date matches:', dateMatches);

// Let's check if there are columns with headers we didn't expect
let headers = [];
for (let c = range.s.c; c <= range.e.c; c++) {
  const cell = worksheet[xlsx.utils.encode_cell({ r: 0, c: c })];
  headers.push({ col: xlsx.utils.encode_col(c), val: cell ? cell.v : '(empty)' });
}
console.log('All headers:');
console.log(headers);

// Check if there is another sheet or if there is another table in the sheets
console.log('Workbook sheets:', workbook.SheetNames);
