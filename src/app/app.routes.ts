import { Routes } from '@angular/router';
import DeashBoardComponent from './pages/deashboard/deashboard.component';
import { OSClientesComponent } from './pages/OS-clientes/OS-clientes.component';
import { OSVeiculosComponent } from './pages/OS-veiculos/OS-veiculos.component';
import CustomersComponent from './pages/customers/customers.component';
import { NewOSComponent } from './pages/new-OS/new-OS.component';
import { CarsComponent } from './pages/cars/cars.component';
import { MechanicalsComponent } from './pages/mechanicals/mechanicals.component';

export const routes: Routes = [
  { path: 'deashBoard', title: 'Home', component: DeashBoardComponent },
  { path: 'customers', title: 'Clientes', component: CustomersComponent },
  { path: 'cars', title: 'Veículos', component: CarsComponent },
  { path: 'mechanicals', title: 'Mecanicos', component: MechanicalsComponent },
  { path: 'osClient', title: 'OS-Clientes', component: OSClientesComponent },
  { path: 'osVehicle', title: 'OS-Veículos', component: OSVeiculosComponent },
  { path: 'new-OS', title: 'Nova Os', component: NewOSComponent },
];
