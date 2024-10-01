// Caminho para o arquivo JSON
// const dataPath = path.join(app.getPath("userData"), "data-electron-angular.json");
// const dataPath = path.join(app.getPath("documents"), "data-electron-angular.json");

// Função para ler o arquivo JSON
// function readJSONFile() {
//   try {
//     if (fs.existsSync(dataPath)) {
//       const data = fs.readFileSync(dataPath, "utf-8");
//       return JSON.parse(data);
//     } else {
//       return {};
//     }
//   } catch (error) {
//     console.error("Erro ao ler o arquivo:", error);
//     return {};
//   }
// }

// Função para escrever no arquivo JSON
// function writeJSONFile(data) {
//   try {
//     fs.writeFileSync(dataPath, JSON.stringify(data));
//     return true;
//   } catch (error) {
//     console.error("Erro ao escrever no arquivo:", error);
//     return false;
//   }
// }