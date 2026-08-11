const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const range = xlsx.utils.decode_range(worksheet['!ref']);
const headers = [];
for (let c = range.s.c; c <= range.e.c; c++) {
  const headerCell = worksheet[xlsx.utils.encode_cell({r: 0, c: c})];
  headers.push(headerCell ? headerCell.v : `Col_${c}`);
}

console.log('Checking for any column (other than Ano, Qtde, Faturamento) containing values in range 1-31:');
for (let c = range.s.c; c <= range.e.c; c++) {
  const colName = headers[c];
  if (['DATA - Ano', 'Qtde Embalagem', 'Qtde Kg/L', 'Faturamento'].includes(colName)) continue;
  
  let matches = 0;
  let sampleVals = [];
  for (let r = 1; r <= range.e.r; r++) {
    const cell = worksheet[xlsx.utils.encode_cell({r: r, c: c})];
    if (cell && typeof cell.v === 'number' && cell.v >= 1 && cell.v <= 31) {
      matches++;
      if (sampleVals.length < 5) sampleVals.push(cell.v);
    }
  }
  if (matches > 0) {
    console.log(`Column ${colName} has ${matches} rows containing numbers 1-31. Samples:`, sampleVals);
  }
}
