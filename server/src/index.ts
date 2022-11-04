import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import productsRoutes from './routes/products.routes';
import providersRoutes from './routes/providers.routes';
import salesRoutes from './routes/sales.routes';
import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

export const server = express();
export const prisma = new PrismaClient();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
server.use('/products', productsRoutes);
server.use('/providers', providersRoutes);
server.use('/sales', salesRoutes);

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
