const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
console.log('SheetNames:', workbook.SheetNames);
console.log('Workbook details:', workbook.Workbook);
if (workbook.Workbook && workbook.Workbook.Sheets) {
  workbook.Workbook.Sheets.forEach((sheet, idx) => {
    console.log(`Sheet ${idx}: Name="${sheet.name}", Hidden=${sheet.Hidden}`);
  });
}
