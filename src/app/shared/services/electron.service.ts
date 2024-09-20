import { ipcRenderer } from 'electron';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  data: any = {};
  newData: string = '';

  async loadData() {
    if (this.isElectronAvailable()) {
      try {
        this.data = await window.electron.fileSystem.readData();
        console.log('Data loaded:', this.data);
        // localStorage.setItem('file', this.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    } else {
      console.error('Electron não está disponível');
    }
  }

  getData(typeData?: string) {
    if (typeData?.length) {
      return this.data[typeData];
    }

    return this.data;
  }

  addTypeData(newData: string) {
    this.newData = newData;
  }

  addData(data: any) {
    this.data[this.newData] = data;

    console.log('addData', this.data[this.newData])
  }

  async saveData() {
    if (this.isElectronAvailable()) {
      try {
        const result = await window.electron.fileSystem.writeData(this.data);
        console.log('Dados salvos com sucesso:', result);
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
    } else {
      console.error('Electron não está disponível');
    }
  }

  private isElectronAvailable(): boolean {
    return !!(window.electron && window.electron.fileSystem);
  }
}
