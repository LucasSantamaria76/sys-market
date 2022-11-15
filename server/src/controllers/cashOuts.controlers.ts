import { Request, Response } from 'express';
import { CashOutsService } from './../services/cashOuts.service';

export class CashOutsControler {
  constructor() {}
  public static async create(req: Request, res: Response) {
    const data = await CashOutsService.create(req.body);
    res.status(data.success ? 201 : 400).send(data);
  }
  public static async getAll(req: Request, res: Response) {
    const data = await CashOutsService.getAll();
    res.status(data.success ? 200 : 400).send(data);
  }
  public static async getTotalPerDay(req: Request, res: Response) {
    const data = await CashOutsService.getTotalPerDay();
    res.status(data.success ? 200 : 400).send(data);
  }
}
