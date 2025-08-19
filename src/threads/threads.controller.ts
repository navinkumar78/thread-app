import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
//import { parser } from '../config/cloudinary.config';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common';
import { cloudinaryStorage } from 'src/config/cloudinary.config';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new thread' })
  create(@Req() req, @Body() dto: CreateThreadDto) {
    //console.log('Creating thread with author ID:', req.user);
    return this.threadsService.create(req.user.sub, dto);
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Upload a file' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: cloudinaryStorage }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    //console.log('File uploaded:', file);
    if(!file) {
      throw new BadRequestException('File is not uploaded');
    }
    return {
      url: file.path,  // Cloudinary URL
      filename: file.filename,
    };
  }


  //@UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all threads' })
  findAll() {
    return this.threadsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a thread by ID' })

  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a thread' })
  @Patch(':id')
  update(@Param('id') id: string, @Req() req, @Body() dto: UpdateThreadDto) {
    return this.threadsService.update(id, req.user.sub, dto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a thread' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.threadsService.remove(id, req.user._id);
  }
}
