import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  private userMaster: UserDto = {
    id: '1',
    name: 'test',
    email: 'test@gmail.com',
  };
  constructor(private readonly jwtService: JwtService) {}

  validateUser(userId: string): UserDto | null {
    if (this.userMaster.id === userId) return this.userMaster;

    return null;
  }

  login() {
    const payload = { email: this.userMaster.email, sub: this.userMaster.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
