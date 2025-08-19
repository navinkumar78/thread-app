import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateThreadDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The content of the thread', required: false })
  content?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'Media URLs associated with the thread', required: false })
  media?: string[];
}
