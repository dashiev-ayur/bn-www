import { http } from "../utils/http-common";

export const getUsers = () => http.get('/api/v1/user');
