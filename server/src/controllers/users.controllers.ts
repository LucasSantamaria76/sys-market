import { Request, Response } from 'express';
import { UserService } from './../services/user.service';

export class UsersControllers {
  constructor() {}

  public static async getAll(req: Request, res: Response) {
    const data = await UserService.getAll();
    res.status(data.success ? 200 : 404).send(data.users);
  }
}
