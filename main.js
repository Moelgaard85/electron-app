const electron = require('electron')
// ELECTRON MODULES
const {
  app,
  BrowserWindow,
  session,
  dialog,
  globalShortcut,
  Menu,
  MenuItem,
  Tray,
  ipcMain
} = electron;
// const app = electron.app
// Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow
console.log('main.js executing');

const path = require('path')
const url = require('url')



// window state
const windowStateKeeper = require('electron-window-state');

// Debug environment
var debug = true;
if (debug) {
  // Auto reloader - watch current directory
  require('electron-reload')(__dirname)
}

// Will be false in beginning. But with timeout, it will be true
// setTimeout(function() {
// console.log("App ready: ", app.isReady());
// }, 3000);


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
// let childWindow;





// IPC listen for renderer channels

// ipcMain.on('channel1', (e, args) => {
//   console.log('Main: recieved channel1: ', args);
//   e.sender.send('channel1', 'Main: Message recieved!');
// });




// TRAY
let tray;

function createTray() {
  tray = new Tray('rabbit-icon.png');
  tray.setToolTip('Honey Bunny');

  // const trayMenu = Menu.buildFromTemplate([{
  //     label: 'Tray Menu Item'
  //   },
  //   {
  //     role: 'quit'
  //   }
  // ]);

  // tray.setContextMenu(trayMenu);

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}




function createWindow(e) {
  // console.log('creating mainWindow. maxOC launchInfo: ', e);


  // SHARED API
  const primary_display = electron.screen.getPrimaryDisplay()

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: primary_display.width,
    height: primary_display.height,
    x: primary_display.bounds.x,
    y: primary_display.bounds.y,
    backgroundColor: '#536DFE',
    frame: false,
    resizable: false
  });




  // // WINDOW STATE KEEPER
  // let winState = windowStateKeeper({
  //   defaultWidth: 414,
  //   defaultHeight: 736
  // });

  // // Create the browser window.
  // mainWindow = new BrowserWindow({
  //   width: winState.width,
  //   height: winState.height,
  //   x: winState.x,
  //   y: winState.y,
  //   // show: false,
  //   backgroundColor: '#536DFE',
  //   // frame: false,
  //   resizable: false
  // });

  // winState.manage(mainWindow);





  // Create the child browser window.
  // childWindow = new BrowserWindow({
  //   width: 600,
  //   height: 300,
  //   show: false,
  //   parent: mainWindow,
  //   modal: false
  // });

  // local
  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  // remote
  // mainWindow.loadURL('https://google.com');
  // childWindow.loadURL('http://google.dk');
  // childWindow.loadURL(`file://${__dirname}/child.html`);

  // If Window has option show: false, then this event is triggered when ready to show
  // childWindow.once('ready-to-show', () => {
  // childWindow.show();
  // });


  // SESSION
  let defaultSession = session.defaultSession;
  // console.log('defaultSession: ', defaultSession);

  // PARTITION SESSION
  // let appSession = session.fromPartition('partition1');
  // console.log('sessions comparisson: ', Object.is(defaultSession, appSession));

  // CLEAR SESSION
  // defaultSession.clearStorageData();

  // defaultSession.cookies.set({
  //   url: 'http://myapp.com',
  //   name: 'cookie1',
  //   value: 'cookies_value',
  //   domain: 'myapp.com',
  //   expirationDate: 9999999999
  // }, (error) => {
  //   // COOKIES
  //   console.log('Cookie set');
  // });


  // WEBCONTENT FROM WINDOW
  let mainWindowContents = mainWindow.webContents;
  // local
  mainWindowContents.loadURL(`file://${__dirname}/index.html`);
  // mainWindowContents.loadURL('https://google.com');

  // mainWindowContents.on('context-menu', (e, params) => {
  //   console.log('context: selectedText: ' + params.selectionText);
  // });










  // SHARED API
  console.log(`Process type: ${process.type}`);
  console.log(`Electron Version: ${process.versions.electron}`);
  console.log(`Chrome (Chromium) Version: ${process.versions.chrome}`);
  console.log(`Resource Path: ${process.resourcesPath}`);


  // HANDLE RENDERER PROCESS CRASH/HANGING
  // mainWindowContents.on('crashed', () => {
  //   console.log('MainWindow renderer process crashed. Reloading!');
  //   mainWindow.reload();
  // })


  // console.log('main: process.getProcessMemoryInfo(): ', process.getProcessMemoryInfo());



  // MENU - RIGHT CLICK CONTEXT MENU
  mainWindowContents.on('context-menu', (e) => {
    e.preventDefault();
    contextMenu.popup();
  });



  // NAVIGATE
  // mainWindowContents.on('will-navigate', (e, url) => {
  //   console.log("will navigate to: " + url);
  // });
  // mainWindowContents.on('did-navigate', (e, url) => {
  //   console.log("did navigate to: " + url);
  // });




  // NEW WINDOW LINK
  // mainWindowContents.on('new-window', (e, url) => {
  //   console.log("New window created for: " + url);
  //   e.preventDefault();

  //   let modalWindow = new BrowserWindow({
  //     width: 600,
  //     height: 400,
  //     modal: true,
  //     parent: mainWindow
  //   });
  //   modalWindow.loadURL(url);

  //   // Emitted when the window is closed.
  //   modalWindow.on('closed', function() {
  //     console.log('modalWindow closed');
  //     // Dereference the window object, usually you would store windows
  //     // in an array if your app supports multi windows, this is the time
  //     // when you should delete the corresponding element.
  //     modalWindow = null
  //   })

  // });



  if (debug) {
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // Run the following from the Console tab of your app's DevTools
    require('devtron').install();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    console.log('mainWindow closed');
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });




  mainWindowContents.on('did-finish-load', () => {
    console.log("mainWindowContents did finish load...");


    // IPC SEND FROM MAIN
    // mainWindowContents.send('private', {
    //   message: 'Message from Main process to mainWindow',
    //   from: 'main.js'
    // });



    // DIALOG
    // showDialog();



    // COOKIES ALL
    // defaultSession.cookies.get({}, (error, cookies) => {
    //   console.log('cookies: ', cookies);
    // });

    // COOKIES SPECIFIC
    // defaultSession.cookies.get({
    //   name: 'cookie1'
    // }, (error, cookies) => {
    //   console.log('cookies: ', cookies);
    // });

  });
}
// createWindow end







// MENU - importing array from mainMenu.js

let mainMenu = Menu.buildFromTemplate(require('./mainMenu'));
let contextMenu = Menu.buildFromTemplate(require('./contextMenu'));









// DIALOG
// function showDialog() {
// dialog.showOpenDialog({
//   defaultPath: 'downloads',
//   buttonLabel: 'Vælg dit billede'
// }, (openPath) => {
//   console.log('openPath: ', openPath);
// });

// dialog.showSaveDialog({
//   defaultPath: 'downloads'
// }, (filename) => {
//   console.log('filename: ', filename);
// });

// let buttons = ['Yes', 'No', 'Maybe'];
// dialog.showMessageBox({
//   buttons: buttons,
//   title: 'Electron Message Dialog',
//   message: 'Please select an answer',
//   detail: 'A more descriptive message'
// }, (buttonIndex) => {
//   console.log('buttonIndex: ', buttons[buttonIndex]);
// });
// }





// SHORTCUTS (accelerator)

// globalShortcut.register('g', () => {
//   console.log('user pressed g');
// });

// globalShortcut.register('CommandOrControl+g', () => {
//   console.log('user pressed command + g');

//   globalShortcut.unregister('CommandOrControl+g');
//   console.log('Key unregistered again!');
// });









// DOWNLOAD
// defaultSession.on('will-download', (e, downloadItem, webContents) => {
//   console.log('downloadItem: ', downloadItem.getFilename());
//   // Get filename
//   let file = downloadItem.getFilename();
//   // Set download path
//   downloadItem.setSavePath('downloads/' + file);
//   // Get download size
//   let size = downloadItem.getTotalBytes();
//   // Get download progress
//   downloadItem.on('updated', (e, state) => {
//     let progress = Math.round((downloadItem.getReceivedBytes() / size) * 100);
//     if (state === 'progressing') {
//       console.log('progress %: ' + progress);
//     }
//   });
//   // Done
//   downloadItem.once('done', (e, state) => {
//     if (state === 'completed') {
//       console.log('progress completed!');
//     }
//   });
// });




// Emitted when the window is closed.
// childWindow.on('closed', function() {
// console.log('childWindow closed');
// Dereference the window object, usually you would store windows
// in an array if your app supports multi windows, this is the time
// when you should delete the corresponding element.
// childWindow = null
// })



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  // MENU - Set menu as apps main menu
  Menu.setApplicationMenu(mainMenu);

  // Tray
  createTray();

  // Monitor power stages
  // electron.powerMonitor.on('suspend', () => {
  //   console.log('System going to sleep..');
  // });
  // electron.powerMonitor.on('resume', () => {
  //   console.log('System waking from sleep..');
  // });

});



// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});




app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// Listen for before quit
// app.on('before-quit', function(e) {
//   console.log('before-quit: Stopping quit!');
//   e.preventDefault();
// })

// Listen for app blur and quit after 3 seconds blur
// app.on('browser-window-blur', function(e) {
//   console.log('browser-window-blur');
//   setTimeout(function() {
//     app.quit();
//   }, 3000);
// })

// Listen for app focus
// app.on('browser-window-focus', function(e) {
//   console.log('browser-window-focus');
// })

// Get important filesystem paths
// console.log("getPath for desktop: ", app.getPath('desktop'));
// console.log("getPath for music: ", app.getPath('music'));
// console.log("getPath for temp: ", app.getPath('temp'));
// console.log("getPath for userData: ", app.getPath('userData'));

// Set app icon badge count (max/linux)
// app.setBadgeCount(22);