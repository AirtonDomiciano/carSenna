import { Component, OnInit } from '@angular/core';
import { DadosService } from '../../shared/services/dados.service';

@Component({
  selector: 'app-cliente',
  templateUrl: 'cliente.component.html',
})
export class ClienteComponent implements OnInit {
  public nome: string = '';

  constructor(private dadosService: DadosService) {}

  ngOnInit(): void {}

  salvarDados() {
    this.dadosService.salvarDados({ nome: this.nome });
  }
}
