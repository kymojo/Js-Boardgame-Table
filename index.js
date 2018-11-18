'use strict'

// Module requirements
const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const port = process.env.PORT || 1337;
const server = app.listen(port, () => console.log(`Now listening on port ${port}`));

// Static files
app.use(express.static(__dirname + '/public'));

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log(`Socket connection [id: ${socket.id}]`);
    
    socket.on('chat', (data) => {
        io.sockets.emit('chat',data); // Send data to all sockets
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing',data); // Send data to all OTHER sockets
    });

});