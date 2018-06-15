const {app, BrowserWindow, Menu, dialog} = require('electron')
const url = require('url')
const path = require('path')

let mainWindow
let unlockWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 650})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  mainWindow.setResizable(false)
  mainWindow.setFullScreenable(false)

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)

  mainWindow.on('close', function(event) {
    let choice = dialog.showMessageBox(this, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit?'
    })
    if(choice == 1){
      event.preventDefault();
    }
  })
}

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'unlock',
        click() {
          console.log('unlock')
        }
      }
    ]
  }
]

app.on('ready', createMainWindow)