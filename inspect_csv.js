const fs = require('fs');
const readline = require('readline');

async function inspect() {
  const fileStream = fs.createReadStream('..\\Localização da Venda\\data-sources\\Pedidos - Localizaço.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  for await (const line of rl) {
    console.log(line);
    count++;
    if (count >= 10) break;
  }
}

inspect();
