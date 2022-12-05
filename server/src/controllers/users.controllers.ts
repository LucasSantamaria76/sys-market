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
    const { userName, password, newPassword } = req.body;
    const data = await UserService.update({ userName, password: newPassword });
    res.status(data.success ? 200 : 404).send(data);
  }
}
