export default class NovaOsModel {
  nomeEmpresa: string;
  telefoneEmpresa: string;
  ruaEmpresa: string;
  cepEmpresa: string;
  numeroEmpresa: string;
  bairroEmpresa: string;
  cidadeEmpresa: string;
  estadoEmpresa: string;
  CNPJ: string;

  nomeMecanico: string;

  nome: string;
  endereco: string;
  cnpj: string;

  dataEmissao: string;

  servicos: Array<any>;
  valorTotal: number;
  constructor() {
    this.nomeEmpresa = 'AIRTON LTDA';
    this.telefoneEmpresa = '46 9 99099164';
    this.CNPJ = '454684654984';
    this.ruaEmpresa = 'Rua são jorge';
    this.cepEmpresa = '85505324';
    this.numeroEmpresa = '200';
    this.bairroEmpresa = 'La salle';
    this.cidadeEmpresa = 'Pato Branco';
    this.estadoEmpresa = 'PR';
    this.nomeMecanico = 'AIRTON EVANDRO DOMICIANO';

    this.nome = '';
    this.endereco = '';
    this.cnpj = '';

    this.dataEmissao = '';

    this.servicos = [];
    this.valorTotal = 0;
  }
}
