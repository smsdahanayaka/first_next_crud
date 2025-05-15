import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // CONSTRUCTOR
  constructor(
    // INJECT USER REPO RELATED USER ENTITY
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // FIND - FUNCTION FIND BY USER NAME
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // FIND - FUNCTION OF FIND BY EMAIL
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // CREATE - FUNCTION OF CREATE NEW USER
  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }
}
