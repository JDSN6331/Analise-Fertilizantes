const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Decode range
const range = xlsx.utils.decode_range(worksheet['!ref']);
console.log('Columns count:', range.e.c - range.s.c + 1);

// Let's inspect cell A2, B2, C2 etc. and also see if there's any column that starts with "DATA - Dia" or has a day number
// Wait, let's look at the first row cell values. We already printed them.
// Let's write a script to search if there is any column where the values are numbers between 1 and 31.
console.log('Scanning for columns where all values are numbers 1-31 (potential day numbers):');
let potentialDayCols = [];
for (let c = range.s.c; c <= range.e.c; c++) {
  let isDayCol = true;
  let countNumbers = 0;
  for (let r = 1; r <= Math.min(range.e.r, 100); r++) {
    const cell = worksheet[xlsx.utils.encode_cell({r: r, c: c})];
    if (cell && cell.t === 'n') {
      countNumbers++;
      if (cell.v < 1 || cell.v > 31 || !Number.isInteger(cell.v)) {
        isDayCol = false;
        break;
      }
    } else if (cell && cell.v !== undefined && cell.v !== '') {
      isDayCol = false;
      break;
    }
  }
  if (isDayCol && countNumbers > 0) {
    potentialDayCols.push(xlsx.utils.encode_col(c));
  }
}
console.log('Columns matching day numbers (1-31):', potentialDayCols);

// Let's check if the day could be in the "Cliente - Matrícula" or "Item" or something else?
// Wait, is it possible that the row indices themselves represent chronological sales, and we can just divide the rows?
// Or wait, is there a column "DATA - Dia" that has no header name? 
// Let's print row 0 cell keys that have data.
// In node, let's print worksheet['!ref'] cells in detail for the first 10 columns.
// Let's check if there are other files in the workspace or parent directory.
// We listed files in c:\Users\joseduque\Documents\Documentos\Python\Análise Fertilizantes and there are only two.
// Let's print the directories and files in C:\Users\joseduque\Documents\Documentos\Python to see if there is another directory or file that contains the data.
