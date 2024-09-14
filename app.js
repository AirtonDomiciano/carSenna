const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/car-senna/browser/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});


// fs.readFile("Documentos/file.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   jsonData = JSON.parse(data);
//   ipcMain.send("load-data", jsonData);
// });

// // o método ipcMain.send para enviar os dados lidos para o seu aplicativo Angular:
// ipcMain.send("load-data", jsonData);

// app.on("ready", createWindow);
