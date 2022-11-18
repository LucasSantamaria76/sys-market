import { Request, Response } from 'express';
import { PurchasesService } from '../services/purchases.service';

export class PurchasesControllers {
  constructor() {}

  static async create(req: Request, res: Response) {
    const data = await PurchasesService.create(req.body);
    res.status(data.success ? 201 : 400).send(data);
  }
  static async getAll(_req: Request, res: Response) {
    const data = await PurchasesService.getAll();

    res.status(data.success ? 200 : 404).send(data);
  }
}
