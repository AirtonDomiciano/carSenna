import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdressInterface } from '../interfaces/adress.interface';

@Injectable({
  providedIn: 'root',
})
export class CepInputService {
  public apiUrl = 'https://viacep.p.rapidapi.com/';

  constructor(private http: HttpClient) {}

  getAll(cep: string): Observable<AdressInterface> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'a729d4798dmsh66bff6786f53f36p154a74jsnd92bd54940b6',
      'X-RapidAPI-Host': 'viacep.p.rapidapi.com',
    });

    const url = `${this.apiUrl}${cep}/json/`;

    return this.http.get<AdressInterface>(url, {
      headers,
    });
  }
}
