import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto {
  @ApiProperty({ example: 'title', description: 'boards titile' })
  title?: string;

  @ApiProperty({
    example: [{ column1: 'column content' }, { column2: 'column content' }],
    description: 'boards titile',
  })
  columns?: object[];
}
