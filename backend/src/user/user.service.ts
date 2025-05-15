import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

//   async findOneByEmail(email: string): Promise<User | null> {
//     return this.usersRepository.findOne({ where: { email } });
//   }
  
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

//   async create(user: Partial<User>): Promise<User> {
//     return this.usersRepository.save(user);
//   }

//   async findOne(id: number): Promise<User | null> {
//     return this.usersRepository.findOne({ where: { id } });
//   }
}
