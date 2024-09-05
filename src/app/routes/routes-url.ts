export class Routes {
  title: string;
  route?: string;
  icon?: string;
  childs?: Array<RoutesChilds> = [];

  constructor() {
    this.title = '';
  }
}

export class RoutesChilds {
  title: string;
  route: string;
  icon?: string;
  params?: string;

  constructor() {
    this.title = '';
    this.route = '';
  }
}

export const RoutesArray: Routes[] = [
  { title: 'DeashBoard', route: 'deashBoard', icon: 'bi bi-house' },
  {
    title: 'Clientes',
    route: 'clientes',
    icon: 'bi bi-person-vcard',
  },
  { title: 'Veículos', route: 'veiculos', icon: 'bi bi-basket' },
];
