import { Routes } from '@angular/router';
import DeashBoardComponent from './pages/deashboard/deashboard.component';
import CustomersComponent from './pages/customers/customers.component';
import { NewOSComponent } from './pages/new-OS/new-OS.component';
import { CarsComponent } from './pages/cars/cars.component';
import { MechanicalsComponent } from './pages/mechanicals/mechanicals.component';
import { OSComponent } from './pages/OS/OS.component';

export const routes: Routes = [
  { path: '', redirectTo: 'deashBoard', pathMatch: 'full' },
  { path: 'deashBoard', title: 'Home', component: DeashBoardComponent },
  { path: 'customers', title: 'Clientes', component: CustomersComponent },
  { path: 'cars', title: 'Veículos', component: CarsComponent },
  { path: 'mechanicals', title: 'Mecanicos', component: MechanicalsComponent },
  { path: 'new-OS', title: 'Nova Os', component: NewOSComponent },
  { path: 'os', title: 'OS', component: OSComponent },
];
