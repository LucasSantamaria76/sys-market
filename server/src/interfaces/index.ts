enum RoleStatus {
  OPERATOR,
  ADMIN,
}

export interface IUser {
  userName: string;
  password: string;
  role?: RoleStatus;
}

export interface IPurchase {
  total: number;
  paid_purchase: boolean;
  providerId: number;
  products: any;
}

export interface IProductPurchase {
  barcode: string;
  benefit: number;
  cost: number;
  quantity: number;
}
