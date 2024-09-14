import { ipcRenderer } from 'electron';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  private arquivoJson = 'dados.json';
  private jsonData: any;

  constructor() {
    this.listenForData();
  }

  salvarDados(dados: any) {
    const json = JSON.stringify(dados);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.arquivoJson;
    a.click();
  }

  private listenForData() {
    ipcRenderer.on('load-data', (event, data) => {
      this.jsonData = data;
      console.log('Received data from Electron:', data);
    });
  }

  getData(): any {
    return this.jsonData;
  }
}
