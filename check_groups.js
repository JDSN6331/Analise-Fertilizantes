const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

const groups = new Set();
rows.forEach(r => {
  const grp = r['Grupo - Nome'];
  if (grp) groups.add(grp.trim());
});

console.log('Grupos de produtos no arquivo:');
console.log(Array.from(groups));
