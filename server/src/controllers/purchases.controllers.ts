import { Request, Response } from 'express';
import { PurchasesService } from '../services/purchases.service';

export class PurchasesControllers {
  constructor() {}

  public static async create(req: Request, res: Response) {
    const data = await PurchasesService.create(req.body);
    res.status(data.success ? 201 : 400).send(data);
  }
  public static async getAll(_req: Request, res: Response) {
    const data = await PurchasesService.getAll();
    console.log(data);

    res.status(data.success ? 20 : 404).send(data);
  }
}
