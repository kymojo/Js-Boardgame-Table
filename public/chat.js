'use strict'

// Make connection
const socket = io.connect("http://localhost:1337");

// Query DOM
var message = document.getElementById('message');
var handle  = document.getElementById('handle');
var send    = document.getElementById('send');
var output  = document.getElementById('output');
var feedback= document.getElementById('feedback');

send.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress',() => {
    if (handle.value != '')
        socket.emit('typing',handle.value);
});

// Listen for events
socket.on('chat',(data)=>{
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
})

socket.on('typing',(data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
}); 