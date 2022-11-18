import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';

export class ProductsController {
  constructor() {}

  static async create(req: Request, res: Response) {
    const { providerID, ...prod } = req.body;
    const data = await ProductsService.create(prod, providerID);
    res.status(data?.success ? 200 : 400).send(data);
  }
  static async getProductsByProvider(req: Request, res: Response) {
    const { providerID } = req.query;
    let data;
    if (providerID) data = await ProductsService.getProductsByProvider(+providerID);

    res.status(data?.success ? 200 : 404).send(data);
  }
  static async getAll(_req: Request, res: Response) {
    const data = await ProductsService.getAll();
    res.status(200).send(data);
  }
  static async getByBarcode(req: Request, res: Response) {
    const data = await ProductsService.getByBarcode(req.params.barcode);
    res.status(200).send(data);
  }
  static async update(req: Request, res: Response) {
    const { barcode } = req.params;
    const data = await ProductsService.update(barcode, req.body);
    res.status(200).send(data);
  }
  static async updateStock(req: Request, res: Response) {
    const { isReduce, quantity } = req.body;
    const data = await ProductsService.updateStock(req.params.id, isReduce, quantity);
    res.status(200).send(data);
  }
  static async delete(req: Request, res: Response) {
    const data = await ProductsService.delete(req.params.barcode);
    res.status(200).send(data);
  }
}
