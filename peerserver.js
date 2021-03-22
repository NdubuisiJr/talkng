const fs = require('fs');
const { PeerServer } = require('peer');
 
const peerServer = PeerServer({
  port: 9000,
  ssl: {
    key: fs.readFileSync(__dirname+'\\certs\\server.key'),
    cert: fs.readFileSync(__dirname+'\\certs\\server.cert'),
  }
});