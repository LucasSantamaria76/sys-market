import { Request, Response } from 'express';
import { AuthService } from './../services/auth.service';
import { IUser } from './../interfaces';

export class ControllerAuth {
  constructor() {}
  public static async register(req: Request, res: Response) {
    const data = await AuthService.register(req.body);
    res.status(data?.success ? 200 : 400).send(data);
  }
  public static async login(req: Request, res: Response) {
    //@ts-ignore
    const { userName, role } = req.user;
    const token = await AuthService.login(userName);
    res.status(200).send({ success: true, user: { userName, role, token } });
  }
}
