import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async uploadFile(file) {
    try {
      const stream = fs.createWriteStream(
        path.resolve(`${process.cwd()}/src/static`, file.originalname),
      );
      stream.write(file.buffer);
    } catch (e) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async downloadFile(filename: string) {
    try {
      return fs.createReadStream(
        path.resolve(`${process.cwd()}/src/static`, filename),
      );
    } catch (e) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
