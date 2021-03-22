//const socket = io('/');
var socket = io('/',{ transports: ['websocket'], rejectUnauthorized: false });

const peer = new Peer({
    host: '/',
    port: '9000',
});

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

const getusermedia = navigator.mediaDevices.getUserMedia;// || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

getusermedia({video: true, audio: true})
.then(stream => {
    myVideo.classList.add('small-video');
    addVideoStream(myVideo, stream);
})
.catch(err =>{
    console.log(err);
});

peer.on('open', id =>{
    console.log('opening');
    socket.emit('join-room', ROOM_ID, id);
});

socket.on('user-joined', userId =>{
    console.log('calling ', userId);
    getusermedia({video: true, audio: true})
    .then(stream =>{
      var call = peer.call(userId, stream);
      hookUpEvents(call);
    })
    .catch(err=> {
      console.log('Failed to get local stream' ,err);
    });
});

peer.on('call', (call) => {
    getusermedia({video: true, audio: true})
    .then(stream => {
        call.answer(stream); 
        hookUpEvents(call);
  }).catch (err => {
    console.log('Failed to get local stream' ,err);
  });
});


const addVideoStream = (video, stream )=>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', ()=>{
        video.play();
    });
    videoGrid.append(video);
};

const hookUpEvents = (call)=>{
    call.on('stream', (remoteStream) =>{
        console.log(remoteStream);
        //const existing = document.getElementById(remoteStream.id)
            const myVideo2 = document.createElement('video');
            //myVideo2.id=remoteStream.id;
            addVideoStream(myVideo2, remoteStream);
    });
    
    call.on('close', ()=>{
        myVideo2.remove();
    });
};