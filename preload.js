const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("electron",{
  isSaving:(callback) => ipcRenderer.on("is-saving",(_event) => callback()),
  saveFile: (content) => ipcRenderer.invoke("dialog:saveFile",content)
});