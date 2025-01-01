const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

let win;

function createWindow() {
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.maximize();
  win.show();

  //TODO ARRUMAR PRA GERAR O EXEC
  if (process.env.PROD == "TRUE") {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, `../dist/car-senna/browser/index.html`),
        protocol: "file:",
        slashes: true,
      })
    );
  } else {
    win.loadURL("http://localhost:4200");
  }

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

// Obter o caminho da pasta Documents
const documentsPath = app.getPath("documents");
// Criar pasta Db dentro da pasta Documents
const dbPath = path.join(documentsPath, "Db");
// const dataPath = path.join(app.getPath("documents"), "data-electron-angular.json");

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

// Criar arquivos JSON dentro da pasta Db
const filesName = ["nota", "customers", "cars", "mechanicals", "config"];
filesName.forEach((fileName) => {
  if (!fs.existsSync(dbPath, `${fileName}.json`)) {
    const filePath = path.join(dbPath, `${fileName}.json`);
    fs.writeFileSync(filePath, "{}"); // Criar arquivo vazio
  }
});

// Função para ler o arquivo JSON
function readJSONFile(fileName) {
  const dataPath = path.join(dbPath, fileName + ".json");
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
function writeJSONFile(fileName, data) {
  const dataPath = path.join(dbPath, `${fileName}.json`);
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Erro ao escrever no arquivo:", error);
    return false;
  }
}

// Listener no processo principal para o canal 'read-data'
ipcMain.handle("read-data", (event, fileName) => {
  return readJSONFile(fileName);
});

ipcMain.handle("write-data", (event, fileName, data) => {
  return writeJSONFile(fileName, data);
});
