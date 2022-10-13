import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';

export interface Product {
  product: string;
  price: number;
  category: string;
  subcategory: string;
  description: string;
}

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    const products = this.productsService.downloadProducts();

    return {
      products,
    };
  }

  @Post()
  addProduct(@Body() body: Product, @Res() res: Response) {
    const products = this.productsService.downloadProducts();

    const isExsist = products.find((item) => item.product === body.product);

    if (isExsist) {
      return res.status(401).send({
        msg: 'This product already exsists',
      });
    }

    this.productsService.addNewProduct(body);

    return res.status(200).send({
      msg: 'Added successfully',
    });
  }

  @Post('/update')
  updateProduct() {}

  @Get('/remove/:product')
  removeProduct(@Res() res: Response, @Param('product') product: string) {
    const lengthBeforeRemoving = this.productsService.downloadProducts().length;

    const lengthAfterRemoving = this.productsService.remove(product).length;

    if (lengthAfterRemoving < lengthBeforeRemoving) {
      return res.status(200).send({
        msg: 'Removed',
      });
    }

    return res.status(401).send({
      msg: 'Not exsist',
    });
  }
}
