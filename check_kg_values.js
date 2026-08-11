const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

let totalKg = 0;
let count = 0;
rows.forEach(r => {
  const filialRaw = r['Filial'];
  if (!filialRaw || typeof filialRaw !== 'string' || filialRaw.includes('Total') || filialRaw.includes('Filtros')) {
    return;
  }
  const group = r['Grupo - Nome'] ? r['Grupo - Nome'].trim() : '';
  if (group === 'Fertilizante Solo') {
    const kgl = parseFloat(r['Qtde Kg/L']) || 0;
    totalKg += kgl;
    count++;
  }
});

console.log('Total Kg/L for Fertilizante Solo:', totalKg);
console.log('Number of rows:', count);
console.log('Average Kg/L per row:', totalKg / count);
