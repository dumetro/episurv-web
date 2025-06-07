import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  // Do not expose password or sensitive fields
  @ApiProperty({ required: false })
  otpCode?: string;
}