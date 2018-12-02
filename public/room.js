'use strict'

// Make connection
const socket = io.connect('http://localhost:1337');

//--------------------------------------------------------

// Page params
const page_params = getUrlVars();
const room_name = page_params['rm'] || 'Untitled';

// DOM variables
const dom_RoomName = document.getElementById('room-name');
const dom_Canvas = document.getElementById('room-canvas');

//--------------------------------------------------------

const canvas = new fabric.Canvas('room-canvas');

// Initialize page
dom_RoomName.innerHTML = room_name;

var rect = new fabric.Rect({
    left: 20,
    top: 20,
    fill: 'red',
    width: 100,
    height: 100
});
canvas.add(rect);

//========================================================

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}