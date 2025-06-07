import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, Matches, MinLength } from 'class-validator';
//login dto
export class LoginDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^\+?\d{10,15}$/)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
//user registration dto
export class RegisterDto {
  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'User phone number' })
  @Matches(/^\+?\d{10,15}$/)
  phoneNumber: string;

  @ApiProperty({ example: 'securePass123', description: 'Password for the user' })
  @MinLength(6)
  password: string;
}