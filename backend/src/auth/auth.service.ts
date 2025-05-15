import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  // LOAD USERSERVISE AND JWT SERVICE
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // VALIDATE - FUNCTION OF VALIDATE IS USER OR NOT
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // send user data without password
      return result;
    }
    return null;
  }

  // LOGIN - FUNCTION OF LOGIN USER
  async login(user: any) {
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }

  // INSERT - FUNCTION OF REGISTER NEW USER
  async register(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.usersService.create(createUserDto);
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return {
      message: 'User registered successfully',
      access_token: token,
    };
  }
}
