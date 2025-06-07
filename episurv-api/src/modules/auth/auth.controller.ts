import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from 'src/shared/dtos/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/config/public-endpoint.decorator';

@Controller('auth')
@ApiTags('Auth Path') // ✅ Groups endpoints under a common tag in Swagger UI
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 200, description: 'Returns success status' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto): Promise<{ message: string }> {
    return this.authService.register(registerDto);
  }
  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Returns JWT token' })
  @ApiBody({ type: RegisterDto }) // Assuming LoginDto is similar to RegisterDto
  async login(@Body() loginDto: RegisterDto): Promise<{ token: string }> {
    return this.authService.validateUser(loginDto);
  } 
}
