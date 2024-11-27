import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { EmpresaConsultaCnpj } from '../interfaces/empresa-consulta-cnpj';

@Injectable({ providedIn: 'root' })
export class ConsultaCnpjService {
  constructor(
    private http: HttpClient /* , private toast: ToastMessageService */
  ) {}
  /*   private toast = inject(ToastMessageService); */
  async consultar(cnpj: string): Promise<EmpresaConsultaCnpj> {
    const _cnpj = cnpj.replace(/\D/g, '');
    /*  this.toast.mostrarAviso('Consultando cnpj.'); */
    return new Promise((resolve) => {
      this.http
        .jsonp(`https://receitaws.com.br/v1/cnpj/${_cnpj}`, 'callback')
        .pipe(timeout(3000))
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (error) => {
            /*  this.toast.mostrarErro(
              error?.message || 'Serviço de consulta indísponivel!'
            ); */
            console.log(error.message);
          }
        );
    });
  }
}
