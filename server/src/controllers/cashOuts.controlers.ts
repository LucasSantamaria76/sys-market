import { Request, Response } from 'express';
import { CashOutsService } from './../services/cashOuts.service';

export const CashOutsControler = {
  create: async (req: Request, res: Response) => {
    const data = await CashOutsService.create(req.body);
    res.status(data.success ? 201 : 400).send(data);
  },
  getAll: async (req: Request, res: Response) => {
    const data = await CashOutsService.getAll();
    res.status(data.success ? 200 : 400).send(data);
  },
  getTotalPerDay: async (req: Request, res: Response) => {
    const data = await CashOutsService.getTotalPerDay();
    res.status(data.success ? 200 : 400).send(data);
  },
  update: async (req: Request, res: Response) => {
    const data = await CashOutsService.update(req.params.id, req.body);
    res.status(data.success ? 200 : 400).send(data);
  },
  delete: async (req: Request, res: Response) => {
    const data = await CashOutsService.delete(req.params.id);
    res.status(data.success ? 200 : 400).send(data);
  },
};
