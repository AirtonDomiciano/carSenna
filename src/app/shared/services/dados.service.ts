import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  // TODO

  private arquivoJson = 'dados.json';

  constructor(private http: HttpClient) {}

  salvarDados(dados: any) {
    const json = JSON.stringify(dados);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.arquivoJson;
    a.click();
  }

  carregarDados() {
    return this.http.get(this.arquivoJson);
  }
}
