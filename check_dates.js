const xlsx = require('xlsx');

const workbook = xlsx.readFile('Analítico - Venda Gerencial.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

console.log('Total rows:', data.length);

// Let's inspect the keys of the first 10 rows to see if they differ
const allKeys = new Set();
data.forEach(row => {
  Object.keys(row).forEach(key => allKeys.add(key));
});
console.log('All unique keys across all rows:', Array.from(allKeys));

// Let's check some sample rows in detail
console.log('Row 0 details:');
console.log(JSON.stringify(data[0], null, 2));

console.log('Row 100 details:');
console.log(JSON.stringify(data[100], null, 2));

// Let's see if there is any date-like string or date object in any of the keys.
// Is there a field that represents date? Let's check.
// Let's find unique values of DATA - Ano and DATA - Mês.
const uniqueYears = new Set();
const uniqueMonths = new Set();
data.forEach(row => {
  uniqueYears.add(row['DATA - Ano']);
  uniqueMonths.add(row['DATA - Mês']);
});

console.log('Unique Years:', Array.from(uniqueYears));
console.log('Unique Months:', Array.from(uniqueMonths));

// Wait, is there a date field or day of the month field? Let's check all row keys and value types.
let dateTypes = {};
data.slice(0, 100).forEach((row, i) => {
  Object.entries(row).forEach(([k, v]) => {
    if (typeof v === 'string' && (v.includes('/') || v.includes('-')) && v.match(/\d/)) {
      if (!dateTypes[k]) dateTypes[k] = [];
      if (dateTypes[k].length < 5) dateTypes[k].push(v);
    }
  });
});
console.log('Keys that might contain dates:', dateTypes);
