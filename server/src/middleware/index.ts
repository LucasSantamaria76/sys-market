import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ERROR_TOKEN } from '../constants/error'

export const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password, userName } = req.body
  console.log({ password, userName })

  const data = await UserService.getByUserName(userName)
  if (!data.success) {
    res.status(404).send(data)
    return
  }
  const matchPassword = await bcrypt.compare(password, data.user?.password || '')
  if (!matchPassword) {
    res.status(401).send({ success: false, error: 'Password inválido' })
    return
  }
  //@ts-ignore
  req.user = {
    userName: data.user?.userName,
    role: data.user?.role
  }

  next()
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const isBearer = authorization?.startsWith('Bearer')
  const token: any = authorization?.split(' ')[1]
  const SECRET: any = process.env.SECRET

  try {
    if (!isBearer && !token) throw new Error('Unauthorized')

    jwt.verify(token, SECRET)

    next()
  } catch (error: any) {
    console.log(ERROR_TOKEN[error.name][error.message])
    next({ success: false, error: ERROR_TOKEN[error.name][error.message] })
  }
}
