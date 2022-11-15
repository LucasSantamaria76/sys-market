import { Request, Response } from 'express';
import { CashOutsService } from './../services/cashOuts.service';

export class CashOutsControler {
  constructor() {}
  public static async create(req: Request, res: Response) {
    const { success, data, error } = await CashOutsService.create(req.body);
    res.status(success ? 201 : 400).send(data || error);
  }
  public static async getAll(req: Request, res: Response) {
    const { success, data, error } = await CashOutsService.getAll();
    res.status(success ? 200 : 400).send(data || error);
  }
  public static async getTotalPerDay(req: Request, res: Response) {
    const { success, totalPerDay, error } = await CashOutsService.getTotalPerDay();
    res.status(success ? 200 : 400).send(totalPerDay || error);
  }
}
