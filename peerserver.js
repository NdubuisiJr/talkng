const fs = require('fs');
const { PeerServer } = require('peer');
const path = require('path');
 
const peerServer = PeerServer({
  port: 9000,
  ssl: {
    key: fs.readFileSync(path.join(__dirname,'certs','server.key')),
    cert: fs.readFileSync(path.join(__dirname,'certs', 'server.cert'))
  }
});