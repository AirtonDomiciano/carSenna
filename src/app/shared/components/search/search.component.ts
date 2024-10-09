import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElectronService } from '../../services/electron.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() emitterData: EventEmitter<any> = new EventEmitter<any>();
  @Input() table = '';

  public searchTerm = '';
  public filteredItems: any[] = [];

  constructor(private http: ElectronService) {}

  async loadData() {
    if (!this.searchTerm) {
      this.filteredItems = [];
      const res: any[] = await this.http.loadData(this.table);
      this.filteredItems = res;
    } else {
      this.filteredItems = [];
      const res: any[] = await this.http.loadData(this.table);
      for (let obj of res) {
        for (let key in obj) {
          if (
            obj[key]
              .toString()
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          ) {
            this.filteredItems.push(obj);
            break;
          }
        }
      }
    }
    this.emitterData.emit(this.filteredItems);
  }
}
