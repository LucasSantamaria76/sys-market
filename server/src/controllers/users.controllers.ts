import { Request, Response } from 'express';
import { UserService } from './../services/user.service';

export const UsersControllers = {
  getAll: async (req: Request, res: Response) => {
    const data = await UserService.getAll();
    res.status(data.success ? 200 : 404).send(data.users);
  },
  delete: async (req: Request, res: Response) => {
    const data = await UserService.delete(+req.params.id);
    res.status(data.success ? 200 : 404).send(data);
  },
  changePassword: async (req: Request, res: Response) => {
    const { userName, password, newPassword } = req.body;
    const data = await UserService.changePassword({ userName, password: newPassword });
    res.status(data.success ? 200 : 404).send(data);
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await UserService.update(+id, req.body);
    res.status(data.success ? 200 : 404).send(data);
  },
};
