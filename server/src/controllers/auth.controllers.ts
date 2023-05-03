import { Request, Response } from 'express';
import { AuthService } from './../services/auth.service';

export const ControllerAuth = {
  register: async (req: Request, res: Response) => {
    const data = await AuthService.register(req.body);

    res.status(data!.success ? 201 : 401).send(data);
  },
  login: async (req: Request, res: Response) => {
    //@ts-ignore
    const { userName, role } = req.user;
    const token = await AuthService.login(userName);
    res.status(200).send({ success: true, user: { userName, role, token } });
  },
};
