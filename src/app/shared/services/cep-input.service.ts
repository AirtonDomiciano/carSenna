import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CepInputService {
  public apiUrl = 'https://viacep.p.rapidapi.com/';

  constructor(private http: HttpClient) {}

  getAll(cep: string) {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'a729d4798dmsh66bff6786f53f36p154a74jsnd92bd54940b6',
      'X-RapidAPI-Host': 'viacep.p.rapidapi.com',
    });

    const params = { cep: cep };

    return this.http.get(this.apiUrl + cep + '/json', { headers, params });
  }
}
