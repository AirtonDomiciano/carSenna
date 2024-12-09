import { IInputSelectItens } from '../../shared/components/input-select/input-select-itens';
import { TipoProdutoEnum } from '../../shared/models/products';

export const SelTipoProduto: IInputSelectItens[] = [
  {
    id: TipoProdutoEnum.NORMAL,
    name: 'Normal',
  },
  {
    id: TipoProdutoEnum.SERVICO,
    name: 'Serviço',
  },
];
