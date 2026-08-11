const fs = require('fs');
const readline = require('readline');

async function parse() {
  const fileStream = fs.createReadStream('C:\\Users\\joseduque\\.gemini\\antigravity-ide\\brain\\bbce924a-34b6-4b92-9a0a-63441cc75aa8\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const targets = [37, 45, 49, 61];
  for await (const line of rl) {
    const obj = JSON.parse(line);
    if (targets.includes(obj.step_index)) {
      console.log(`=== Step ${obj.step_index} (${obj.source}) ===`);
      console.log(obj.content);
      if (obj.tool_calls) {
        console.log('Tool Calls:', JSON.stringify(obj.tool_calls, null, 2));
      }
    }
  }
}

parse();
