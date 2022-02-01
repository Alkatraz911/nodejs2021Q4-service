import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  Body,
  StreamableFile,
  UseInterceptors,

  Get,
  Param,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiOperation({ summary: 'upload file' })
  @ApiResponse({ status: 201 })
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  uploadFile(@UploadedFile() file) {
     this.fileService.uploadFile(file);
  }

  @Get(':filename')
  async downloadFile(
    @Param('filename') filename: string
  ): Promise<StreamableFile> {
    const stream = await this.fileService.downloadFile(filename);
    return new StreamableFile(stream);
  }
}
