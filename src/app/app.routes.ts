import { Routes } from '@angular/router';
import { CarsComponent } from './pages/cars/cars.component';
import { CompanyComponent } from './pages/company/company.component';
import CustomersComponent from './pages/customers/customers.component';
import DashBoardComponent from './pages/dashboard/dashboard.component';
import { MechanicalsComponent } from './pages/mechanicals/mechanicals.component';
import { NewOSComponent } from './pages/new-OS/new-OS.component';
import { OSComponent } from './pages/OS/OS.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashBoard', title: 'Home', pathMatch: 'full' },
  { path: 'dashBoard', title: 'Home', component: DashBoardComponent },
  { path: 'customers', title: 'Clientes', component: CustomersComponent },
  { path: 'cars', title: 'Veículos', component: CarsComponent },
  { path: 'mechanicals', title: 'Mecanicos', component: MechanicalsComponent },
  { path: 'new-OS', title: 'Nova Os', component: NewOSComponent },
  { path: 'os', title: 'OS', component: OSComponent },
  { path: 'company', title: 'Empresa', component: CompanyComponent },
  { path: 'products', title: 'Produtos', component: ProductsComponent },
];
