import { Request, Response } from 'express';
import { ProvidersService } from './../services/provider.service';

export class ProvidersController {
  constructor() {}

  static async create(req: Request, res: Response) {
    const data = await ProvidersService.create(req.body);
    res.status(201).send(data);
  }
  static async getAll(_req: Request, res: Response) {
    const data = await ProvidersService.getAll();
    res.status(200).send(data);
  }
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await ProvidersService.getById(+id);
    res.status(200).send(data);
  }
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await ProvidersService.update(+id, req.body);
    res.status(200).send(data);
  }
  static async addProduct(req: Request, res: Response) {
    const { id } = req.params;
    const data = await ProvidersService.addProduct(+id, req.body);
    res.status(200).send(data);
  }
  static async delete(req: Request, res: Response) {
    const data = await ProvidersService.delete(+req.params.id);
    res.status(200).send(data);
  }
}
