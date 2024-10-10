export default class Customer {
  id: number;
  name: string;
  telephone?: string;
  email?: string;
  cpf?: string;
  cep?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  estado?: string;
  complemento?: string;
  numero?: string;
  inscEst?: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.telephone = '';
    this.cpf = '';
    this.cep = '';
    this.cidade = '';
    this.bairro = '';
    this.rua = '';
    this.estado = '';
    this.complemento = '';
    this.numero = '';
    this.inscEst = '';
  }
}
