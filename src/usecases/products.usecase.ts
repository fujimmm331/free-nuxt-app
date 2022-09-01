import { keyValueObject } from "../models/keyValue.model";
import BaseUseCase from "./base.usecase";

export default class ProductUseCase extends BaseUseCase {
  async getProducts() {
    return await this.get('/products')
  }

  async getProduct(id: number) {
    return await this.get(`/products/${id}`)
  }
}