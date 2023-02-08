export interface IAuthDTO {
  access_token: string;
  refresh_token: string;
  user: any;
}

export interface ILoginDTO {
  login: string;
  password: string;
}

export interface ILoginForm extends ILoginDTO {
}
