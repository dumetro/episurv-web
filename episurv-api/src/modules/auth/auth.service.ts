import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { LoginDto, RegisterDto } from 'src/shared/dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Twilio } from 'twilio';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // ✅ Ensure JwtService is injected
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // ✅ Correct repository injection
  ) {}

  async register(registerDto: RegisterDto) {
      const existingUser = await this.userRepository.findOne({
        where: [{ email: registerDto.email }, { phoneNumber: registerDto.phoneNumber }],
      });
  
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const newUser = this.userRepository.create({ ...registerDto, password: hashedPassword });
  
      await this.userRepository.save(newUser);
      return { message: 'User registered successfully' };
  }

  async validateUser(loginDto: LoginDto) {
  // Try to find user by username, email, or phoneNumber
  const user = await this.userRepository.findOne({
    where: [
      { username: loginDto.username },
      { email: loginDto.username },
      { phoneNumber: loginDto.username }
    ],
    select: ['id', 'username', 'email', 'phoneNumber', 'password'],
  });

  if (!user) {
    throw new UnauthorizedException('User not found');
  }
  if (!loginDto.password || !bcrypt.compareSync(loginDto.password, user.password)) {
    throw new UnauthorizedException('Invalid credentials');
  }
  // Create JWT token
  const token = this.createToken(user);
  return { token };
}
  //create JWT token
  // This method creates a JWT token for the user
  createToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  }
}
