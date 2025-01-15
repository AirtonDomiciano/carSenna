import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Customer from '../../models/customer';
import { ElectronService } from '../../services/electron.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-search-input',
  template: `
    <div class="form-floating">
      <input
        type="text"
        id="clientSearch"
        class="form-control"
        [(ngModel)]="nameSelected"
        [ngClass]="{
          'is-invalid': form.get(frmName)?.invalid && form.get(frmName)?.touched
        }"
        (input)="onSearchTermChange($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />
      <label for="clientSearch">{{ label }}</label>
    </div>

    <div
      *ngIf="form.get(frmName)?.invalid && form.get(frmName)?.touched"
      class="text-danger"
    >
      Please enter a valid search term.
    </div>

    <ul *ngIf="focus" class="ul-input">
      <li
        *ngFor="let item of filteredItens; let i = index"
        (click)="onClicked(item)"
        [ngClass]="{ active: selectedIndex === i }"
      >
        {{ item.id }} - {{ item.name }}
      </li>
    </ul>
  `,
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() label: string = '';
  @Input() searchTable: string = '';

  filteredItens: any[] = [];
  public itens: Customer[] = [];
  public searchTerm: string = '';
  public focus: boolean = false;
  public nameSelected: string = '';

  public selectedIndex: number | null = null; // Índice do item selecionado

  constructor(private http: ElectronService) {}

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.focus) {
      if (event.key === 'ArrowDown') {
        event.preventDefault(); // Evitar rolagem da página
        if (
          this.selectedIndex === null ||
          this.selectedIndex === this.filteredItens.length - 1
        ) {
          this.selectedIndex = 0; // Volta para o primeiro item
        } else {
          this.selectedIndex++;
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault(); // Evitar rolagem da página
        if (this.selectedIndex === null || this.selectedIndex === 0) {
          this.selectedIndex = this.filteredItens.length - 1; // Vai para o último item
        } else {
          this.selectedIndex--;
        }
      } else if (event.key === 'Enter') {
        event.preventDefault(); // Evitar o comportamento padrão
        if (this.selectedIndex !== null) {
          this.onClicked(this.filteredItens[this.selectedIndex]);
        }
      }
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    if (!this.searchTable?.length) {
      return;
    }

    this.itens = [];

    const res: any[] = await this.http.loadData(this.searchTable);

    if (res?.length > 0) {
      this.itens = res;

      if (this.form.controls[this.frmName].value) {
        const item = res.find(
          (el) => el.id === this.form.controls[this.frmName].value
        );

        this.nameSelected = `${item.id} - ${item.name}`;
      }
    }
  }

  onSearchTermChange(event: any): void {
    this.itensFiltered();
    this.selectedIndex = null; // Resetar o índice selecionado
  }

  itensFiltered() {
    if (this.nameSelected) {
      this.filteredItens = this.itens.filter((client) =>
        `${client.id} - ${client.name}`
          .toLowerCase()
          .includes(this.nameSelected)
      );
    } else {
      this.filteredItens = this.itens;
    }
  }

  onFocus(): void {
    this.focus = true;
    this.itensFiltered();
  }

  onBlur(): void {
    this.focus = false;
  }

  onClicked(item: { id: number; name: string }) {
    this.form.controls[this.frmName].setValue(item.id);

    this.nameSelected = `${item.id} - ${item.name}`;

    this.focus = false;
  }
}
