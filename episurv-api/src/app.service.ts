import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'episurv-api is running! Use the /api-docs endpoint to access the API documentation. API is running on port: ' + process.env.API_PORT;
  }
}
