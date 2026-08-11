const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

let maxKg = 0;
let minKg = 999999;
let sampleBigKg = [];

rows.forEach(r => {
  const filialRaw = r['Filial'];
  if (!filialRaw || typeof filialRaw !== 'string' || filialRaw.includes('Total') || filialRaw.includes('Filtros')) {
    return;
  }
  const group = r['Grupo - Nome'] ? r['Grupo - Nome'].trim() : '';
  if (group === 'Fertilizante Solo') {
    const kgl = parseFloat(r['Qtde Kg/L']) || 0;
    if (kgl > maxKg) maxKg = kgl;
    if (kgl < minKg && kgl > 0) minKg = kgl;
    if (kgl > 500) {
      sampleBigKg.push({ item: r['Item - Descrição'], kgl, fat: r['Faturamento'] });
    }
  }
});

console.log('Max Kg/L for Fertilizante Solo:', maxKg);
console.log('Min Kg/L (non-zero) for Fertilizante Solo:', minKg);
console.log('Sample rows with Kg/L > 500:', sampleBigKg.slice(0, 5));
