import { IUser } from "../typing";
import { http } from "../utils/http-common";

export const getUsers = () => http.get<IUser[]>('/api/v1/user');
