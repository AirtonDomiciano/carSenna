import { Component, OnInit } from '@angular/core';
import TableDataComponent from '../../shared/components/table/table.component';
import NovaOsModel from '../../shared/models/os';
import { ElectronService } from '../../shared/services/electron.service';

@Component({
  selector: 'app-os',
  standalone: true,
  imports: [TableDataComponent],
  templateUrl: './os.component.html',
  styleUrl: './os.component.scss',
})
export class OSComponent implements OnInit {
  public os: Array<NovaOsModel> = [];

  constructor(private http: ElectronService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(os?: any) {
    if (os) {
      this.os = os;
    } else {
      this.os = [];

      const res: NovaOsModel[] = await this.http.loadData('os');
      if (res?.length > 0) {
        this.os = res;
      }
    }
  }
}
