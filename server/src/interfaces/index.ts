enum RoleStatus {
  OPERATOR,
  ADMIN,
}

export interface IUser {
  userName: string;
  password: string;
  role?: RoleStatus;
}
