const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

console.log('Total sales records:', data.length);

// Let's examine if any column contains something like a day (e.g. 1-31)
// or if we can find any date values in other rows
let hasDay = false;
let samples = [];
for (let i = 0; i < data.length; i++) {
  const row = data[i];
  // check if any key has "dia" or similar or value is date
  for (const [k, v] of Object.entries(row)) {
    if (k.toLowerCase().includes('dia') || k.toLowerCase().includes('data') && !k.toLowerCase().includes('ano') && !k.toLowerCase().includes('mês')) {
      hasDay = true;
      if (samples.length < 5) samples.push({ row: i, key: k, val: v });
    }
  }
}

console.log('Found fields related to day/date (excluding month/year):', hasDay);
if (samples.length > 0) {
  console.log('Samples:', samples);
}

// Wait! If there are no day fields, is the row order representing chronological sales?
// Or did we miss a date column?
// Let's check the very first row and the very last row, and their properties.
console.log('Row 0:', data[0]);
console.log('Row ' + (data.length - 1) + ':', data[data.length - 1]);

// Let's look at the "Filtros aplicados" row which appears in DATA - Ano unique values.
// In check_dates.js, we saw Unique Years: [ 2026, 'Total', 'Filtros aplicados:\r\nANO é 2026\r\nMês é julho' ]
// Let's see which rows contain these special values.
const specialRows = data.filter(row => row['DATA - Ano'] !== 2026);
console.log('Special rows length:', specialRows.length);
specialRows.forEach((r, idx) => {
  console.log(`Special row ${idx}:`, r);
});
