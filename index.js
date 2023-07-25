
const WebSocket = require('ws');
const config = require('./config.json');

(async () => {
  const apiKey = process.argv[2];
  const seriesId = process.argv[3];

  const ws = new WebSocket(`wss://api.grid.gg/live-data-feed/series/${seriesId}?key=${apiKey}&useConfig=true&fromSequenceNumber=0`);
  ws.on('open', () => {
    console.log(`socket was open`);
    ws.send(JSON.stringify(config));
    console.log(`sended config`);
  });

  ws.on('message', async (data) => {
    console.log('got message:', data.toString().slice(0, 50) + '...');
  });

  ws.on('error', (err) => {
    console.log('got err:', err);
  });

  ws.on('close', (code, reason) => {
    console.log('got close event:', { code, reason });
  });
})();
