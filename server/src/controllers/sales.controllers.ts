import { Request, Response } from 'express';
import { SalesService } from '../services/sales.service';

export class SalesControllers {
  constructor() {}

  public static async create(req: Request, res: Response) {
    const { paymentMethod, total, items } = req.body;
    const data = await SalesService.create(paymentMethod, total, items);
    res.status(!data?.error ? 201 : 400).send(data);
  }

  public static async getAll(req: Request, res: Response) {
    const data = await SalesService.getAll(req.query.date);
    res.status(data.success ? 200 : 404).send(data);
  }
}
