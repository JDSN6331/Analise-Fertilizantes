const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

let count = 0;
for (let r of rows) {
  const group = r['Grupo - Nome'] ? r['Grupo - Nome'].trim() : '';
  if (group === 'Fertilizante Solo') {
    console.log({
      Item: r['Item - Descrição'],
      Embalagens: r['Qtde Embalagem'],
      KgL: r['Qtde Kg/L'],
      Faturamento: r['Faturamento']
    });
    count++;
    if (count >= 15) break;
  }
}
