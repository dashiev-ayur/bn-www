import { ILoginDTO } from "../typing";
import { http } from "../utils/http-common";

export const auth = (body: ILoginDTO) => {
  return http.post('/api/v1/auth/login', body);
};

export const refresh = (refresh_token: string) => {
  return http.post('/api/v1/auth/refresh', {}, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });
};

export const logout = (refresh_token: string) => {
  return http.post('/api/v1/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });
};

export const testAccessToken = (access_token: string) => {
  return http.get('/api/v1/auth/secret', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}