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
    // Print steps where model searched for dates or did code execution related to date
    if (obj.source === 'MODEL' || obj.source === 'SYSTEM') {
      const contentStr = JSON.stringify(obj.content || '');
      const toolCallsStr = JSON.stringify(obj.tool_calls || '');
      if (contentStr.includes('date') || contentStr.includes('dia') || contentStr.includes('semana') || toolCallsStr.includes('date') || toolCallsStr.includes('dia')) {
        console.log(`Step ${obj.step_index} (${obj.source}):`, (obj.content || '').substring(0, 150), '...');
      }
    }
  }
}

parse();
