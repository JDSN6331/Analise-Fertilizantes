const fs = require('fs');
const readline = require('readline');

async function parse() {
  const fileStream = fs.createReadStream('C:\\Users\\joseduque\\.gemini\\antigravity-ide\\brain\\bbce924a-34b6-4b92-9a0a-63441cc75aa8\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT') {
      console.log('USER:', obj.content);
    }
  }
}

parse();
