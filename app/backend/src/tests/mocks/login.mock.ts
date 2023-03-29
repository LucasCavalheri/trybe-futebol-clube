import { ILogin } from '../../api/interfaces/Login/ILogin';
import User from '../../database/models/user.model';

const userPassword =
  '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

export const invalidToken = '1nv4lId.t0k&n';

export const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjgwMDkzNTQ0fQ.xgv5Ti3AcN8oRtjoOp9SnIWAPrQapPa4Lamy81ri6Lk';

export const loginWithoutEmail: ILogin = {
  email: '',
  password: 'thisisapassword',
};

export const loginWithoutPassword: ILogin = {
  email: 'email@email.com',
  password: '',
};

export const loginWithIncorrectEmailFormat: ILogin = {
  email: 'email',
  password: 'thisisapassword',
};

export const loginWithIncorrectPasswordFormat: ILogin = {
  email: 'email@email.com',
  password: 'pass',
};

export const loginWithNonExistentEmail: ILogin = {
  email: 'dont@exists.com',
  password: 'secret_user',
};

export const loginWithNonExistentPassword: ILogin = {
  email: 'user@user.com',
  password: 'thispassdoesnotexists',
};

export const correctlyLogin: ILogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const user: User = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: userPassword,
} as unknown as User;
