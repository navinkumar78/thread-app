import { Controller, Post, Delete, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UnlikeDto } from './dto/unlike.dto';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Like a thread or reply' })
  @Post()
  like(@Body() dto: CreateLikeDto, @Req() req: any) {
    console.log('jwt payload', req.user);
    return this.likesService.like(dto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Unlike a thread or reply' })
  unlike(@Body() dto: UnlikeDto, @Req() req: any) {
    return this.likesService.unlike(dto, req.user.sub);
  }

  @Get(':targetType/:targetId/count')
  @ApiOperation({ summary: 'Get the like count for a thread or reply' })
  count(@Param('targetType') targetType: 'thread' | 'reply', @Param('targetId') targetId: string) {
    return this.likesService.count(targetType, targetId);
  }

  @UseGuards(AuthGuard)
  @Get(':targetType/:targetId/liked')
  @ApiOperation({ summary: 'Check if a thread or reply is liked by the user' })
  isLiked(@Param('targetType') targetType: 'thread' | 'reply', @Param('targetId') targetId: string, @Req() req: any) {
    return this.likesService.isLikedByUser(targetType, targetId, req.user.sub);
  }
}
