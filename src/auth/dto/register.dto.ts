import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @MinLength(6)
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
