import { Component, OnInit } from '@angular/core';
import TableDataComponent from '../../shared/components/table/table.component';
import NovaOsModel from '../../shared/models/os';
import { ElectronService } from '../../shared/services/electron.service';
import { OSTable } from '../../shared/interfaces/os-table.interface';
import { ScreenshotComponent } from '../../shared/components/screenshot/screenshot.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from '../../shared/components/search/search.component';

@Component({
  selector: 'app-os',
  standalone: true,
  imports: [
    TableDataComponent,
    ScreenshotComponent,
    NgbModalModule,
    SearchComponent,
  ],
  templateUrl: './os.component.html',
  styleUrl: './os.component.scss',
})
export class OSComponent implements OnInit {
  public listaOs: OSTable[] = [];
  public os: NovaOsModel[] = [];

  constructor(private http: ElectronService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(os?: any[]) {
    this.listaOs = [];
    if (os) {
      this.os = os;
    } else {
      this.os = await this.http.loadData('os');
    }
    if (this.os.length > 0) {
      for (let item of this.os) {
        const obj: OSTable = {
          id: item.id,
          nomeFirma: item.customer.name,
          emissao: item.dataEmissao,
          carro: item.car.modelo,
          fone: item.customer.telephone,
          descricao: item.descricaoServico,
        };
        this.listaOs.push(obj);
      }
    }
  }

  onEventClickBotaoAcoes($event: any) {
    const obj = this.os.find((el) => el.id === $event.obj.id);

    switch ($event.id) {
      case 'id-open':
        const modal = this.modal.open(ScreenshotComponent, { size: 'xl' });
        modal.componentInstance.preview = obj;
        break;
      default:
        break;
    }
  }
}
