import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import productsRoutes from './routes/products.routes';
import providersRoutes from './routes/providers.routes';
import salesRoutes from './routes/sales.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import purchasesRoutes from './routes/purchases.routes';
import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

export const server = express();
export const prisma = new PrismaClient();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
server.use('/products', productsRoutes);
server.use('/providers', providersRoutes);
server.use('/sales', salesRoutes);
server.use('/auth', authRoutes);
server.use('/users', usersRoutes);
server.use('/purchases', purchasesRoutes);

const PORT = process.env.PORT || 4000;

const main = async () => {
  try {
    server.listen(PORT);
    console.log(`server listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
