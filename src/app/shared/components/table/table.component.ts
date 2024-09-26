import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { TypeButtons, TypeColumns } from './table-data.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TelefonePipe } from '../../pipes/telephone.pipe';
import { CpfCnpjPipe } from '../../pipes/cpfCnpj.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, TelefonePipe, CpfCnpjPipe],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export default class TableDataComponent implements OnInit {
  @Input() id = 0;
  @Input() tFootTemplate: string | TemplateRef<any> | any;

  // @ViewChildren(DropdownComponent) compChild!: QueryList<DropdownComponent>;
  // @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  /* Pesquisar na Grid */
  @Input() search = '';

  /* Colunas tabela */
  @Input() columns: Array<TypeColumns> = [];

  @Input() buttons: Array<TypeButtons> = [];

  /* BODY */
  @Input() tBodyList: Array<any> = [] || [];

  /* HEADER */
  @Input() showFooter = true;

  /* FOOTER */
  @Input() showHeader = true;

  /* AÇÕES */
  /* Essa flag é usada para esconder TH e TD de ações. */
  @Input() usarAcoes = true;

  /* Evento ao clicar em um botão que fique dentro de Ações Ex: Entidades => (Editar ou Excluir) */
  @Output() onEventClickBotaoAcoes: EventEmitter<{
    id: string;
    obj: any;
    index?: number;
  }> = new EventEmitter();

  /* Evento Global, usado ao selecionar itens na grid */
  @Output() onEventClickBotaoSelecionado: EventEmitter<any> =
    new EventEmitter();
  protected showButtons = false;

  /* itens por pagina */
  @Input() lengthGrid = [25, 50];

  protected selecionaTamanhoGrid = [];
  @Input() idTabelaReorderColumn: string = '';

  protected itemsPerPage = 25;
  protected itemsPerPageInput = 25;
  protected selectValueBlock = 0;
  protected lengthGridBlock = false;

  protected dropDownActive = 0;

  protected colspan = 0;
  protected page = 1;
  // protected sort: SortEvent;

  protected showMsg = false;
  public showTFoot = false;
  // public itemsPage: ArrayLike<any> = [];

  public sumHeightContent = 0;

  constructor(private eRef: ElementRef, public cdRef: ChangeDetectorRef) {}

  getPaginate(): string {
    return `paginate-${this.id}`;
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.colspan = this.columns.length + 1;
  }

  onClickBotaoAcoes($event: { id: string; obj: any; index?: number }): void {
    // $event.index = this.verificaIndiceDoItemNaLista($event.obj);
    this.onEventClickBotaoAcoes.emit($event);
  }
}
