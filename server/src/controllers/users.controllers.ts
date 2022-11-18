import { Request, Response } from 'express';
import { UserService } from './../services/user.service';

export class UsersControllers {
  constructor() {}

  static async getAll(req: Request, res: Response) {
    const data = await UserService.getAll();
    res.status(data.success ? 200 : 404).send(data.users);
  }
  static async delete(req: Request, res: Response) {
    const data = await UserService.delete(+req.params.id);
    res.status(data.success ? 200 : 404).send(data);
  }
  static async update(req: Request, res: Response) {
    const {
      body,
      params: { id },
    } = req;
    const data = await UserService.update(+id, body);
    res.status(data.success ? 200 : 404).send(data?.data);
  }
}
