import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UnlikeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The ID of the thread or reply to unlike' })
  targetId: string;

  @IsNotEmpty()
  @IsEnum(['thread', 'reply'])
  @ApiProperty({ description: 'The type of the target (thread or reply)' })
  targetType: 'thread' | 'reply';
}
