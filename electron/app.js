const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `../dist/car-senna/browser/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );

  // Open the DevTools.
  win.webContents.openDevTools();

  win.on("closed", function () {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (win === null) createWindow();
});

// Caminho para o arquivo JSON
// const dataPath = path.join(app.getPath("userData"), "data-electron-angular.json");
const dataPath = path.join(app.getPath("documents"), "data-electron-angular.json");

// Função para ler o arquivo JSON
function readJSONFile() {
  try {
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, "utf-8");
      return JSON.parse(data);
    } else {
      return {};
    }
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return {};
  }
}

// Função para escrever no arquivo JSON
function writeJSONFile(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Erro ao escrever no arquivo:", error);
    return false;
  }
}

// Configurar listeners do IPC
ipcMain.handle("read-data", () => {
  return readJSONFile();
});

ipcMain.handle("write-data", (event, data) => {
  return writeJSONFile(data);
});
