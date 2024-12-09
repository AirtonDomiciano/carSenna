export enum TipoProdutoEnum {
  NORMAL = 1,
  SERVICO = 2,
}

export default class Product {
  idProducts: number = 0;
  descricao: string = '';
  valor: number = 0;
  tipoProduto: TipoProdutoEnum = TipoProdutoEnum.NORMAL;
}
