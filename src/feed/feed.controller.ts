import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user feed' })
  @Get()
  getUserFeed(@Req() req: any, @Query('page') page = '1', @Query('limit') limit = '20') {
    return this.feedService.getUserFeed(req.user.sub, parseInt(page, 10), parseInt(limit, 10));
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending feed' })
  getTrendingFeed(@Query('page') page = '1', @Query('limit') limit = '20') {
    return this.feedService.getTrendingFeed(parseInt(page, 10), parseInt(limit, 10));
  }
}
