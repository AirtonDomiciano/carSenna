import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnChanges {
  @Output() emitterData: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() table: string = '';

  public searchTerm: string = '';
  public filteredItems: any[] = [];
  cachedData = [];
  timer: any;

  constructor(private http: ElectronService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['table'].currentValue !== this.table) {
      this.cachedData = []; // ao alterar de tela limpa o cache
    }
  }

  onSearch() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.loadData();
    }, 500);
  }

  async loadData() {
    this.filteredItems = [];
    if (!this.cachedData.length) {
      this.cachedData = await this.http.loadData(this.table);
    }

    if (!this.searchTerm) {
      this.filteredItems = this.cachedData;
    } else {
      this.filteredItems = this.dynamicSearch(this.cachedData, this.searchTerm);
    }

    this.emitterData.emit(this.filteredItems);
  }

  dynamicSearch(array: any[], query: string) {
    const lowerCaseQuery = query.toLowerCase();

    return array.filter((item) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
  }
}
