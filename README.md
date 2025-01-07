# **Vika Mechanical - Aplicação Electron**

Este projeto utiliza **Angular** e **Electron** para criar uma aplicação desktop.

## **Comandos**

### **1. Instalar dependências**

Antes de gerar o `.exe`, certifique-se de que todas as dependências do projeto estão instaladas:

```bash
npm install
```

### **2. Gerar o build do Angular**

```bash
npm run build
```

### **3. Rodar projeto**

Rodar angular:

```bash
npm run start
```

Rodar electron:

```bash
npm run electron
```

### **4. Gerar o executável (.exe)**

```bash
npx electron-builder --win
```
