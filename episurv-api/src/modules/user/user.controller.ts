import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/database/entities/user.entity';
import { UserDto } from 'src/shared/dtos/user.dto';
import { Public } from 'src/config/public-endpoint.decorator';


@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users', type: [UserDto] })
    async getUsers(): Promise<UserDto[]> {
        const users = await this.userService.getAllUsers();
        // Optionally map to DTO if needed
        return users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            otpCode: user.otpCode,
        }));
    }
}