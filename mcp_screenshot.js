const { spawn } = require('child_process');

const server = spawn('node', [process.env.CHROME_DEVTOOLS_MCP_JS]);
let id = 1;

function callTool(name, args) {
  return new Promise(resolve => {
    const curId = id++;
    const req = { jsonrpc: '2.0', id: curId, method: 'tools/call', params: { name, arguments: args } };
    
    const handler = (data) => {
      const lines = data.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const msg = JSON.parse(line);
          if (msg.id === curId) {
            server.stdout.removeListener('data', handler);
            resolve(msg);
          }
        } catch(e) {}
      }
    };
    server.stdout.on('data', handler);
    server.stdin.write(JSON.stringify(req) + '\n');
  });
}

(async () => {
  await callTool('navigate_page', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));
  await callTool('take_screenshot', { filePath: 'screenshot.png', fullPage: true });
  process.exit(0);
})();
