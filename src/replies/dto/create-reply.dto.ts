import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The content of the reply' })
  content: string;
}
