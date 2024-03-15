// Modules to control application life and create native browser window
const { app, BrowserWindow,dialog,ipcMain,Menu,MenuItem } = require('electron')
const path = require('node:path')
const fs = require("node:fs")

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    minWidth:500,
    minHeight:500,
    center:true,
    title:"Textify 1.0",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
    // Get the application menu
  const menu = Menu.getApplicationMenu()
  const menu_items = menu.items;
  //menu_items.pop()
  //menu_items.pop()
  //menu_items.pop()
  // Find the Edit menu
  const fileMenu = menu_items.find(item => item.label === 'File')

  const saveItem = new MenuItem({
    label: 'Save',
    click: ()=>mainWindow.webContents.send("is-saving")
  })


  // Append the new item to the Edit menu
  fileMenu.submenu.append(saveItem)

  const menuT = Menu.buildFromTemplate(menu_items)
  mainWindow.setMenu(menuT)
  
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}


app.whenReady().then(() => {
  const handleSaveFile = async (_event,content) =>{
    const path  = await dialog.showSaveDialog()
    console .log(path,content)
    fs.writeFile(path.filePath, content, err => {
      if (err) {
        dialog.showErrorBox(err.name,err.message)
      }
    });
  }
  ipcMain.handle("dialog:saveFile",handleSaveFile)

  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


