import { Request, Response } from 'express';
import { ProvidersService } from './../services/provider.service';

export const ProvidersController = {
  create: async (req: Request, res: Response) => {
    const data = await ProvidersService.create(req.body);
    res.status(201).send(data);
  },
  getAll: async (_req: Request, res: Response) => {
    const data = await ProvidersService.getAll();
    res.status(200).send(data);
  },
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await ProvidersService.getById(+id);
    res.status(200).send(data);
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await ProvidersService.update(+id, req.body);
    res.status(200).send(data);
  },
  addProduct: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await ProvidersService.addProduct(+id, req.body);
    res.status(200).send(data);
  },
  delete: async (req: Request, res: Response) => {
    const data = await ProvidersService.delete(+req.params.id);
    res.status(200).send(data);
  },
};
