import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  // data: any = {};
  // newData: string = '';

  async loadData(fileName: string): Promise<any> {
    const isElectronAvailable: boolean = this.isElectronAvailable();

    if (!isElectronAvailable) {
      console.error('Electron não está disponível');
      return;
    }

    try {
      const data = await window.electron.fileSystem.readData(fileName);
      console.log('Data loaded:', data);
      return data;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      return null;
    }
  }

  // getData(typeData?: string) {
  //   if (typeData?.length) {
  //     return this.data[typeData];
  //   }

  //   return this.data;
  // }

  // addTypeData(newData: string) {
  //   this.newData = newData;
  // }

  // addData(data: any) {
  //   this.data[this.newData] = data;
  // }

  async saveData(fileName: string, data: any) {
    const isElectronAvailable: boolean = this.isElectronAvailable();

    if (!isElectronAvailable) {
      console.error('Electron não está disponível');
      return false;
    }

    try {
      console.log('oque está salvando ', data);
      await window.electron.fileSystem.writeData(fileName, data);
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  }

  private isElectronAvailable(): boolean {
    return !!(window.electron && window.electron.fileSystem);
  }
}
