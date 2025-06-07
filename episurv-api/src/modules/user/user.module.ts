import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Module({
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([User]) 
    ],
    providers: [UserService],
})
export class UserModule {}
