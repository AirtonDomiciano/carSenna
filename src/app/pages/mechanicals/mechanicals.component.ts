import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { ElectronService } from '../../shared/services/electron.service';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import Mechanical from '../../shared/models/mechanical';
import { MechanicalComponent } from '../mechanical/mechanical.component';
import TableDataComponent from '../../shared/components/table/table.component';
import { SearchComponent } from '../../shared/components/search/search.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableDataComponent,
    MechanicalComponent,
    SearchComponent,
  ],
  selector: 'app-mechanicals',
  templateUrl: 'mechanicals.component.html',
  styleUrls: ['mechanicals.component.scss'],
  providers: [ToastMessageService],
})
export class MechanicalsComponent implements OnInit {
  public mechanicals: Mechanical[] = [];
  @ViewChild(MechanicalComponent) mechanical!: MechanicalComponent;

  constructor(private http: ElectronService) {}

  ngOnInit() {
    this.loadData();
    // this.http.addTypeData('mechanicals');
  }

  async loadData(mechanicals?: any) {
    if (mechanicals) {
      this.mechanicals = mechanicals;
    } else {
      this.mechanicals = [];

      const res: Mechanical[] = await this.http.loadData('mechanicals');

      if (res?.length > 0) {
        this.mechanicals = res;
      }
    }
  }

  add() {
    this.mechanical.add();
  }

  onEventClickBotaoAcoes($event: any) {
    switch ($event.id) {
      case 'id-edit':
        this.mechanical.edit($event.obj);
        break;
      case 'id-trash':
        this.mechanical.delete($event.obj);
        break;
      default:
        break;
    }
  }
}
