import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('main') // Base path for this controller
@ApiTags('Base Path') // Groups endpoints under a common tag in Swagger UI
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get api documentation text' })
  @ApiResponse({ status: 200, description: 'Returns api documentaion text' })
  getHello(): string {
    return this.appService.getHello();
  }
}
