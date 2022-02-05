import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'title', description: 'boards titile' })
  title?: string;

  @IsArray()
  @ApiProperty({
    example: [{ column1: 'column content' }, { column2: 'column content' }],
    description: 'boards titile',
  })
  columns?: object[];
}
