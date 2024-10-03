import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Customer from '../../models/customer';
import { ElectronService } from '../../services/electron.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-client-input',
  template: `<div [formGroup]="form">
    <div class="form-floating">
      <input
        type="text"
        id="clientSearch"
        class="form-control"
        formControlName="{{ frmName }}"
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
      <ng-container *ngFor="let client of filteredClients">
        <li (click)="onClicked(client)">{{ client.id }} - {{ client.name }}</li>
      </ng-container>
    </ul>
  </div> `,
  styleUrls: ['./customers-input.component.scss'],
})
export class ClientInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() label: string = '';

  filteredClients: any[] = [];
  public customers: Customer[] = [];
  public searchTerm: string = '';
  public focus: boolean = false;

  constructor(private http: ElectronService) {}

  ngOnInit(): void {
    // this.form.controls[this.frmName].setValidators([Validators.required]);
    this.loadData();
  }

  async loadData() {
    // this.customers = [];

    // const res = await this.http.loadData('customers');

    // if (res?.length > 0) {
    //   this.customers = res;
    // }

    this.customers = [
      { id: 1, name: 'Airton Doe' },
      { id: 2, name: 'Jane Doe' },
      { id: 3, name: 'Bob Smith' },
      { id: 83, name: 'Bob Smith' },
      { id: 534, name: 'Bob Smith' },
      { id: 3, name: 'Bob Smith' },
      { id: 341, name: 'Bob Smith' },
      { id: 3, name: 'Bob Smith' },
      { id: 568, name: 'Bob Smith' },
    ];
  }

  onSearchTermChange(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredClients = this.customers.filter((client) =>
      `${client.id} - ${client.name}`.toLowerCase().includes(searchTerm)
    );
  }

  onFocus(): void {
    this.focus = true;
  }

  onBlur(): void {
    this.focus = false;
  }

  onClicked($event: any) {
    console.log($event);
  }
}
