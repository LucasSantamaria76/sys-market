import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password, userName } = req.body;

  const data = await UserService.getByUserName(userName);
  if (!data.success) {
    res.status(404).send(data);
    return;
  }
  const matchPassword = await bcrypt.compare(password, data.user?.password || '');
  if (!matchPassword) {
    res.status(401).send({ success: false, error: 'Password inválido' });
    return;
  }
  //@ts-ignore
  req.user = {
    userName: data.user?.userName,
    role: data.user?.role,
  };

  next();
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const isBearer = authorization?.startsWith('Bearer');
  const token = authorization?.split(' ')[1];

  try {
    if (!isBearer && !token) {
      res.status(401).send({ success: false, error: 'Unauthorized: Bearer token inexistente' });
      return;
    }

    const decode = jwt.verify(token || '', process.env.SECRET || '');

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, error: 'Unauthorized: Bearer token inválido' });
  }
};
