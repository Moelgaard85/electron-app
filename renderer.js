// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log('A log message from renderer.js');

// const {
//   ipcRenderer
// } = require('electron');


// // Send message to main process on channel1
// ipcRenderer.send('channel1', 'Hello from renderer process');

// // Listen
// ipcRenderer.on('channel1', (e, args) => {
//   console.log('Renderer: recived on channel1: ', args);
// });
// ipcRenderer.on('private', (e, args) => {
//   console.log('Renderer: recived on private: ', args);
// });