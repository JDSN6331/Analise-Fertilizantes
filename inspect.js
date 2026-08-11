const xlsx = require('xlsx');

function inspectFile(filePath, name) {
  console.log(`=== Inspecting ${name} ===`);
  const workbook = xlsx.readFile(filePath);
  console.log('Sheet Names:', workbook.SheetNames);
  
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  
  // Convert worksheet to JSON rows (limit to 5 for inspection)
  const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 0 });
  console.log('Header Row:', rows[0]);
  console.log('Sample Rows (1 to 3):');
  console.log(rows.slice(1, 4));
  
  const allRows = xlsx.utils.sheet_to_json(worksheet);
  console.log(`Total Rows: ${allRows.length}`);
  if (allRows.length > 0) {
    console.log('First full row object keys:', Object.keys(allRows[0]));
    console.log('First row value:', allRows[0]);
  }
  console.log('\n');
}

const salesPath = 'Analítico - Venda Gerencial.xlsx';
const regionPath = 'FILIAL - MESOREGIAO v1.xlsx';

inspectFile(salesPath, 'Sales Data');
inspectFile(regionPath, 'Mesoregion Mapping');
