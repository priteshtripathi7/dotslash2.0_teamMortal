const express=require('express');
const app=express();

app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index');
})

server=app.listen(process.env.PORT || 3000);

const io = require("socket.io")(server)

//listen on every connection
io.on('connection',(socket)=>{
    console.log('New user connected');

    //default username
    socket.username="Anonymus";

    //listen on change username
    socket.on('change_username',(data)=>{
        socket.username=data.username;
    })

    //listen on new message
    socket.on('new_message', (data)=>{
        //broadcast the new messages
        io.sockets.emit('new_message', {message: data.message, username:socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})