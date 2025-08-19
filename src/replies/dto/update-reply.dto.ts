import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReplyDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The content of the reply', required: false })
  content?: string;
}
