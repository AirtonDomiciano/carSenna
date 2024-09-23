import { Routes } from '@angular/router';
import DeashBoardComponent from './pages/deashboard/deashboard.component';
import { VeiculosComponent } from './pages/veiculos/veiculos.component';
import { OSClientesComponent } from './pages/OS-clientes/OS-clientes.component';
import { OSVeiculosComponent } from './pages/OS-veiculos/OS-veiculos.component';
import CustomersComponent from './pages/customers/customers.component';
import { CustomerComponent } from './pages/customer/customer.component';

export const routes: Routes = [
  { path: 'deashBoard', title: 'Home', component: DeashBoardComponent },
  { path: 'customers', title: 'Clientes', component: CustomersComponent },
  // { path: 'customer/:id', title: 'Cliente', component: CustomerComponent } Vai abrir com drawer,
  { path: 'vehicles', title: 'Veículos', component: VeiculosComponent },
  { path: 'osClient', title: 'OS-Clientes', component: OSClientesComponent },
  { path: 'osVehicle', title: 'OS-Veículos', component: OSVeiculosComponent },
];
