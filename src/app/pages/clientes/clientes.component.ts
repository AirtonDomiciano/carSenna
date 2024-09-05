import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: 'clientes.component.html',
})
export default class ClientesComponent implements OnInit {
  customers = [
    { nome: 'Airton', telefone: '(46) 9 99099164', carro: 'Blazer' },
    { nome: 'Valeria', telefone: '(46) 9 99099164', carro: 'Fiat 147' },
  ];

  constructor() {}

  ngOnInit() {}
}
