import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'User bio', required: false })
  bio?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: 'User avatar URL', required: false })
  avatar?: string;
}
