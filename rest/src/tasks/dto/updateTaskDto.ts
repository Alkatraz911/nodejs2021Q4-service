import { ApiProperty } from '@nestjs/swagger';


export class UpdateTaskDto {
  @ApiProperty({ example: "title", description: 'tasks titile' })
  title: string;

  order?: number;

  @ApiProperty({ example: "some task descriptin", description: 'tasks description' })
  description?: string;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}