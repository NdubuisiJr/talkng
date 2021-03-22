const express = require('express');
const sio = require('socket.io');
const { v4: uuidV4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const server = require('https').createServer({
    key: fs.readFileSync(path.join(__dirname,'certs','server.key')),
    cert: fs.readFileSync(path.join(__dirname,'certs', 'server.cert')),
    requestCert: true,
    rejectUnauthorized: false
},app);
const io = sio(server); 


app.set('view engine', 'ejs'); 

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get('/:id', (req, res)=>{
    res.render('room',{roomId: req.params.id});
});

io.on('connection', socket =>{
    socket.on('join-room', (roomId, userId)=>{
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', userId);
    });
});

server.listen(3000, ()=>{
    console.log('server listening on port 3000');
});