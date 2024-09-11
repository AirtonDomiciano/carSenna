const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      // Esta opção permite o uso de require() no processo de renderização
      webSecurity: false,
      // Esta opção permite o uso de módulos nativos
      allowRunningInsecureContent: true,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/car-senna/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Habilita as ferramentas de desenvolvedor
  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// Esta linha desativa avisos de segurança para módulos nativos
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
