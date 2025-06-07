import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    //get all users
    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
    //get user by id
    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }
}