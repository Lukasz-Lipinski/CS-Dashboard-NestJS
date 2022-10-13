import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Product } from './products.controller';

@Injectable()
export class ProductsService {
  url = '';
  allProducts: Product[] = [];

  downloadProducts() {
    return this.allProducts;
  }

  addNewProduct(product: Product) {
    this.allProducts.push(product);

    return 'Added successfully';
  }

  update() {}

  remove(productName: string) {
    this.allProducts = this.allProducts.filter(
      (item) => item.product !== productName,
    );

    return this.allProducts;
  }
}
