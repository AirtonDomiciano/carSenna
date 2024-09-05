import { Routes } from '@angular/router';
import DeashBoardComponent from './pages/deashboard/deashboard.component';
import ClientesComponent from './pages/clientes/clientes.component';

export const routes: Routes = [
  { path: 'deashBoard', title: 'Home', component: DeashBoardComponent },
  { path: 'clientes', title: 'Clientes', component: ClientesComponent },
  { path: 'veiculos', title: 'Veículos', component: ClientesComponent },
];
