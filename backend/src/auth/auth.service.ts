import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Dummy user (in real app, use DB)
  private users = [{ id: 1, username: 'user1', password: bcrypt.hashSync('1234', 10) }];

  // async validateUser(username: string, password: string): Promise<any> {
  //   const user = this.users.find(u => u.username === username);
  //   if (user && await bcrypt.compare(password, user.password)) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async register(userData: { name: string; email: string; password: string }) {
  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   return this.usersService.create({
  //     ...userData,
  //     password: hashedPassword,
  //   });
  // }
}
