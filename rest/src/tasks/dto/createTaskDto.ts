import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  
    @IsNotEmpty() @IsString()
    @ApiProperty({example: "title", description: 'tasks titile'})
    title: string;
    
    order?: number;

    @IsNotEmpty() @IsString()
    @ApiProperty({example: "some task descriptin", description: 'tasks description'})
    description?: string;

    userId: string | null;
    boardId: string | null;
    columnId: string | null;
  }