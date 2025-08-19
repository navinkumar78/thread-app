import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('replies')
@Controller('threads/:threadId/replies')
@UseGuards(AuthGuard)
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a reply' })
  create(
    @Param('threadId') threadId: string,
    @Req() req,
    @Body() dto: CreateReplyDto,
    @Query('parentId') parentId?: string,
  ) {
    
    return this.repliesService.create(threadId, req.user.sub, dto, parentId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all replies' })
  findAll(
    @Param('threadId') threadId: string,
    @Query('parentId') parentId?: string,
  ) {
    return this.repliesService.findAll(threadId, parentId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reply by ID' })
  findById(@Param('id') id: string) {
    return this.repliesService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a reply' })
  update(@Param('id') id: string, @Body() dto: UpdateReplyDto) {
    return this.repliesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reply' })
  remove(@Param('id') id: string) {
    return this.repliesService.remove(id);
  }
}
