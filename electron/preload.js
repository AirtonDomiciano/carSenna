const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  },
  fileSystem: {
    readData: (fileName) => ipcRenderer.invoke("read-data", fileName),
    writeData: (fileName, data) =>
      ipcRenderer.invoke("write-data", fileName, data),
  },
});

console.log("Preload script is running");
