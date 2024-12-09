import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../../shared/components/search/search.component';
import TableDataComponent from '../../shared/components/table/table.component';
import Product from '../../shared/models/products';
import { ElectronService } from '../../shared/services/electron.service';
import { ProductComponent } from '../product/product.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableDataComponent,
    ProductComponent,
    SearchComponent,
  ],
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  @ViewChild(ProductComponent) product!: ProductComponent;

  constructor(private http: ElectronService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData(products?: any) {
    if (products) {
      this.products = products;
    } else {
      this.products = [];

      const res: Product[] = await this.http.loadData('products');
      if (res?.length > 0) {
        this.products = res;
      }
    }
  }

  add() {
    this.product.add();
  }

  onEventClickBotaoAcoes($event: any) {
    switch ($event.id) {
      case 'id-edit':
        this.product.edit($event.obj);
        break;
      case 'id-trash':
        this.product.delete($event.obj.idProducts);
        break;
      default:
        break;
    }
  }
}
