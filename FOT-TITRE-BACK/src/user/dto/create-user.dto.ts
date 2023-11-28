import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstname: string;

  name: string;
  password: string;
  email: string;
  admin: boolean;
}
