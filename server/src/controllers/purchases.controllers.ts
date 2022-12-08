import { Request, Response } from 'express';
import { PurchasesService } from '../services/purchases.service';

export const PurchasesControllers = {
  create: async (req: Request, res: Response) => {
    const data = await PurchasesService.create(req.body);
    res.status(data.success ? 201 : 400).send(data);
  },
  getAll: async (_req: Request, res: Response) => {
    const data = await PurchasesService.getAll();

    res.status(data.success ? 200 : 404).send(data);
  },
};
