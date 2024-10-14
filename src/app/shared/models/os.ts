import Car from './car';
import Customer from './customer';
import Mechanical from './mechanical';

export default class NovaOsModel {
  id: number;
  nomeEmpresa: string;
  telefoneEmpresa: string;
  ruaEmpresa: string;
  cepEmpresa: string;
  numeroEmpresa: string;
  bairroEmpresa: string;
  cidadeEmpresa: string;
  estadoEmpresa: string;
  CNPJ: string;

  dataEmissao: string;
  descricaoServico: string;

  idCustomer: number;
  idMechanical: number;
  idCar: number;

  mechanical: Mechanical = new Mechanical();
  customer: Customer = new Customer();
  car: Car = new Car();

  descriptionItem: string;
  amountItem: number;
  valueItem: number;
  unitPriceItem: number;

  totalValue: number | string;

  constructor() {
    this.id = 0;
    this.nomeEmpresa = 'AIRTON LTDA';
    this.telefoneEmpresa = '46 9 99099164';
    this.CNPJ = '454684654984';
    this.ruaEmpresa = 'Rua são jorge';
    this.cepEmpresa = '85505324';
    this.numeroEmpresa = '200';
    this.bairroEmpresa = 'La salle';
    this.cidadeEmpresa = 'Pato Branco';
    this.estadoEmpresa = 'PR';

    this.dataEmissao = '';
    this.descricaoServico = '';

    this.descriptionItem = '';
    this.amountItem = 0;
    this.valueItem = 0;
    this.unitPriceItem = 0;

    this.totalValue = 0;

    this.idCustomer = 0;
    this.idMechanical = 0;
    this.idCar = 0;

    this.mechanical = new Mechanical();
    this.customer = new Customer();
    this.car = new Car();
  }
}
