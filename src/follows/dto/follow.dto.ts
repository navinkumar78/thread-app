import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FollowDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The ID of the user to follow/unfollow' })
  followingId: string; // user to follow/unfollow
}
