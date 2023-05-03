export const API = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/';

export const HEADER_HEIGHT = 60;

export const PAYMENT_METHODS = {
  CASH: 1,
  CARD: 2,
};
export const PAYMENT_METHODS_STRING = {
  1: 'Efectivo',
  2: 'Tarjeta',
};
