import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThreadDto {
  @IsString()
  @ApiProperty({ description: 'The content of the thread' })
  content: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'Media URLs associated with the thread', required: false })
  media?: string[];
}
