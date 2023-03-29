import { sign } from 'jsonwebtoken';
import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../../database/models/user.model';
import HttpException from '../errors/HttpException';
import { ILoginService } from '../interfaces/Login/ILoginService';
import HttpStatus from '../utils/http-status.enum';
import ErrorMessage from '../utils/error-messages.enum';

export default class LoginService implements ILoginService {
  constructor(private userModel: ModelStatic<User> = User) {}

  public login = async (email: string, password: string): Promise<string> => {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        ErrorMessage.INVALID_EMAIL_OR_PASSWORD,
      );
    }

    const isPasswordValid: boolean = bcrypt.compareSync(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        ErrorMessage.INVALID_EMAIL_OR_PASSWORD,
      );
    }

    return sign({ email, password }, process.env.JWT_SECRET as string);
  };

  public loginWithRole = async (email: string): Promise<string | undefined> => {
    const user = await this.userModel.findOne({ where: { email } });
    return user?.role;
  };

  private findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  };
}
