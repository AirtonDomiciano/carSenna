// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-data',
//   template: `
//     <div>
//       <h2>Dados</h2>
//       <pre>{{ data | json }}</pre>
//       <input [(ngModel)]="newData" placeholder="Novo dado" />
//       <button (click)="addData()">Adicionar</button>
//       <button (click)="saveData()">Salvar</button>
//     </div>
//   `,
//   standalone: true,
//   imports: [CommonModule, FormsModule],
// })
// export class DataComponent implements OnInit {
//   data: any = {};
//   newData: string = '';

//   ngOnInit() {
//     console.log('Component initialized');
//     this.loadData();
//   }

//   async loadData() {
//     if (this.isElectronAvailable()) {
//       try {
//         this.data = await window.electron.fileSystem.readData();
//         console.log('Data loaded:', this.data);
//       } catch (error) {
//         console.error('Erro ao carregar dados:', error);
//       }
//     } else {
//       console.error('Electron não está disponível');
//     }
//   }

//   addData() {
//     if (this.newData) {
//       this.data[Date.now()] = this.newData;
//       this.newData = '';
//     }
//   }

//   async saveData() {
//     console.log('Saving data...');
//     if (this.isElectronAvailable()) {
//       try {
//         const result = await window.electron.fileSystem.writeData(this.data);
//         console.log('Dados salvos com sucesso:', result);
//       } catch (error) {
//         console.error('Erro ao salvar dados:', error);
//       }
//     } else {
//       console.error('Electron não está disponível');
//     }
//   }

//   private isElectronAvailable(): boolean {
//     return !!(window.electron && window.electron.fileSystem);
//   }
// }
