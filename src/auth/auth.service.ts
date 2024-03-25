import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/util/password-helper';
import { LoginDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDTO): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && (await comparePassword(password, user.password))) {
      const { password, ...result } = user;
      if (result) {
        return this.validate(user);
      }
    }
    return null;
  }

  async validate(user: User) {
    const payload = { email: user.email, id: user.id, userType: user.userType };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
