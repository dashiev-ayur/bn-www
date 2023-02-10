import { AppRoles } from "./type-auth";

export interface IUser {
  id: number;
  name: string;
  role: AppRoles;
  login: string;
  password?: string;
  refreshToken?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
