const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Check the actual keys and formats in detail for first 5 rows
console.log('--- Printing raw cells for first 10 rows in columns A and B ---');
for (let r = 1; r <= 10; r++) {
  const cellA = worksheet[xlsx.utils.encode_cell({r: r, c: 0})];
  const cellB = worksheet[xlsx.utils.encode_cell({r: r, c: 1})];
  const cellC = worksheet[xlsx.utils.encode_cell({r: r, c: 2})];
  const cellP = worksheet[xlsx.utils.encode_cell({r: r, c: 15})];
  
  console.log(`Row ${r}:`);
  console.log(`  A (Ano): v=${cellA ? cellA.v : 'N/A'}, t=${cellA ? cellA.t : 'N/A'}, w=${cellA ? cellA.w : 'N/A'}, z=${cellA ? cellA.z : 'N/A'}`);
  console.log(`  B (Mês): v=${cellB ? cellB.v : 'N/A'}, t=${cellB ? cellB.t : 'N/A'}, w=${cellB ? cellB.w : 'N/A'}, z=${cellB ? cellB.z : 'N/A'}`);
  console.log(`  C (Filial): v=${cellC ? cellC.v : 'N/A'}, t=${cellC ? cellC.t : 'N/A'}, w=${cellC ? cellC.w : 'N/A'}`);
  console.log(`  P (Fat): v=${cellP ? cellP.v : 'N/A'}, t=${cellP ? cellP.t : 'N/A'}, w=${cellP ? cellP.w : 'N/A'}`);
}
