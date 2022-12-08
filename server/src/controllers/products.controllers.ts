import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';

export const ProductsController = {
  create: async (req: Request, res: Response) => {
    const { providerID, ...prod } = req.body;
    const data = await ProductsService.create(prod, providerID);
    res.status(data?.success ? 200 : 400).send(data);
  },
  getProductsByProvider: async (req: Request, res: Response) => {
    const { providerID } = req.query;
    let data;
    if (providerID) data = await ProductsService.getProductsByProvider(+providerID);

    res.status(data?.success ? 200 : 404).send(data);
  },
  getAll: async (_req: Request, res: Response) => {
    const data = await ProductsService.getAll();
    res.status(200).send(data);
  },
  getByBarcode: async (req: Request, res: Response) => {
    const data = await ProductsService.getByBarcode(req.params.barcode);
    res.status(200).send(data);
  },
  update: async (req: Request, res: Response) => {
    const { barcode } = req.params;
    const data = await ProductsService.update(barcode, req.body);
    res.status(200).send(data);
  },
  updateStock: async (req: Request, res: Response) => {
    const { isReduce, quantity } = req.body;
    const data = await ProductsService.updateStock(req.params.id, isReduce, quantity);
    res.status(200).send(data);
  },
  delete: async (req: Request, res: Response) => {
    const data = await ProductsService.delete(req.params.barcode);
    res.status(200).send(data);
  },
};
