import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElectronService } from '../../services/electron.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() emitterData: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() table: string = '';

  public searchTerm: string = '';
  public filteredItems: any[] = [];

  constructor(private http: ElectronService) {}

  async loadData() {
    this.filteredItems = [];
    const res: any[] = await this.http.loadData(this.table);

    if (!this.searchTerm) {
      this.filteredItems = res;
    } else {
      for (let obj of res) {
        if (this.searchInObject(obj)) {
          this.filteredItems.push(obj);
        }
      }
    }

    this.emitterData.emit(this.filteredItems);
  }

  private searchInObject(obj: any[]): boolean {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        if (this.searchInObject(obj[key])) {
          return true;
        }
      } else if (
        obj[key]
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  }
}
