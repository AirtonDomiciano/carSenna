import { Routes } from '@angular/router';
import DeashBoardComponent from './pages/deashboard/deashboard.component';
import ClientesComponent from './pages/clientes/clientes.component';
import { VeiculosComponent } from './pages/veiculos/veiculos.component';
import { OSClientesComponent } from './pages/OS-clientes/OS-clientes.component';
import { OSVeiculosComponent } from './pages/OS-veiculos/OS-veiculos.component';
import { ClienteComponent } from './pages/cliente/cliente.component';

export const routes: Routes = [
  { path: 'deashBoard', title: 'Home', component: DeashBoardComponent },
  { path: 'clients', title: 'Clientes', component: ClientesComponent },
  { path: 'client', title: 'Cliente', component: ClienteComponent },
  { path: 'vehicles', title: 'Veículos', component: VeiculosComponent },
  { path: 'osClient', title: 'OS-Clientes', component: OSClientesComponent },
  { path: 'osVehicle', title: 'OS-Veículos', component: OSVeiculosComponent },
];
