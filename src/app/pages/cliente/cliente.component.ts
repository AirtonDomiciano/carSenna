import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { ElectronService } from '../../shared/services/electron.service';
import { Clientes } from '../../shared/interface/clientes.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-cliente',
  templateUrl: 'cliente.component.html',
})
export class ClienteComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private http: ElectronService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      telephone: [''],
      email: [''],
    });


  }

  salvarDados() {
    const cliente = this.form.value
    this.http.addTypeData('clientes')
    let clientes: Clientes[] = this.http.getData('clientes')

    if (!clientes?.length) {
      clientes = []
    }
    
    clientes.push(cliente);

    this.http.addData(clientes);

    this.http.saveData();
  }
}
