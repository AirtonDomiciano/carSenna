import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import registeredCompany from '../../shared/models/registered-company';
import { CnpjInputComponent } from '../../shared/components/cnpj-input/cnpj-input.component';
import { ElectronService } from '../../shared/services/electron.service';
import { TypeWriterComponent } from '../../shared/components/type-writer/type-writer.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CnpjInputComponent,
    TypeWriterComponent,
  ],
  selector: 'app-registered-company',
  templateUrl: 'registered-company.component.html',
  styleUrls: ['./registered-company.component.scss'],
})
export class RegisteredCompanyComponent implements OnInit {
  model: registeredCompany = new registeredCompany();

  @Output() onRegistred: EventEmitter<boolean> = new EventEmitter<boolean>();
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private http: ElectronService) {}

  ngOnInit() {
    this.form = this.fb.group(this.model);
  }

  onCadastre() {
    this.http.saveData('config', this.form.value).then((res) => {
      if (res) {
        this.onRegistred.emit(res);
      }
    });
  }
}
