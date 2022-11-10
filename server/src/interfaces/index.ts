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
  products: Array<string>;
}
