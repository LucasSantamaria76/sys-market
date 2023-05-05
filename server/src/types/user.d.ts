export const TRoleStatus: {
  OPERATOR: 'OPERATOR'
  ADMIN: 'ADMIN'
}

export type TUser = {
  userName: string
  role?: TRoleStatus
  password: string
}

export type TUserUpdate = {
  userName?: string
  role?: TRoleStatus
  password?: string
}
