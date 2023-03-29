export interface ILoginService {
  login(email: string, password: string): Promise<string>;
  loginWithRole(email: string): Promise<string | undefined>;
}
