import { Request, Response } from 'express';
import { ProvidersService } from './../services/provider.service';

export class ProvidersController {
  constructor() {}

  public static async create(req: Request, res: Response) {
    const data = await ProvidersService.create(req.body);
    res.status(201).send(data);
  }
  public static async getAll(_req: Request, res: Response) {
    const data = await ProvidersService.getAll();
    res.status(200).send(data);
  }
  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await ProvidersService.getById(+id);
    res.status(200).send(data);
  }
  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await ProvidersService.update(+id, req.body);
    res.status(200).send(data);
  }
  public static async addProduct(req: Request, res: Response) {
    const { id } = req.params;
    const data = await ProvidersService.addProduct(+id, req.body);
    res.status(200).send(data);
  }
  public static async delete(req: Request, res: Response) {
    const data = await ProvidersService.delete(+req.params.id);
    res.status(200).send(data);
  }
}
