import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';

export interface Product {
  brand: string;
  model: string;
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

    const isExsist = products.find(
      (item) => item.model === body.model && item.brand === body.brand,
    );

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

  // finish this method!
  @Post('/update')
  updateProduct(
    @Res() res: Response,
    @Body() body: { product: Product; index: number },
  ) {
    const newProductsList = this.getProducts().products;
    newProductsList.splice(body.index, 1, body.product);

    this.productsService.update(newProductsList);
    return res.status(200).send({
      msg: 'Successful',
    });
  }

  @Delete('/remove/:model')
  removeProduct(@Res() res: Response, @Param('model') model: string) {
    const lengthBeforeRemoving = this.productsService.downloadProducts().length;

    const lengthAfterRemoving = this.productsService.remove(model).length;

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
