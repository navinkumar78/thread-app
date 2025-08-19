import { Controller, Post, Delete, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowDto } from './dto/follow.dto';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('follows')
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Follow a user' })
  follow(@Body() dto: FollowDto, @Req() req: any) {
    return this.followsService.follow(req.user.sub, dto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Unfollow a user' })
  unfollow(@Body() dto: FollowDto, @Req() req: any) {
    return this.followsService.unfollow(req.user.sub, dto);
  }

  @Get(':userId/followers')
  @ApiOperation({ summary: 'List followers of a user' })
  listFollowers(@Param('userId') userId: string) {
    return this.followsService.listFollowers(userId);
  }

  @Get(':userId/following')
  @ApiOperation({ summary: 'List users followed by a user' })
  listFollowing(@Param('userId') userId: string) {
    return this.followsService.listFollowing(userId);
  }
}
