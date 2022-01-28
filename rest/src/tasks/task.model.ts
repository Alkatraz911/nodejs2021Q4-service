import {
    Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'tasks' })
class Task {
    @ApiProperty({example: 'uuid', description: 'uuid uniq id'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: 'title', description: 'task title'})
    @Column({ length: 255, default: 'tasktitle' })
    title: string;

    @ApiProperty({example: 1, description: 'task order number'})
    @Column('integer', { default: 0 })
    order: number;

    @ApiProperty({example: 'any task description', description: 'task description'})
    @Column({ length: 255, default: 'description' })
    description: string;

    @ApiProperty({example: '5052d8e6-70d2-46e0-9646-90749210bd6c', description: 'uuid id of user who created task'})
    @Column('varchar', { length: 255, default: null, nullable: true })
    userId: string | null;

    @ApiProperty({example: '5052d8e6-70d2-46e0-9646-90749210bd6c', description: 'uuid id of board in which task was created'})
    @Column('varchar', { length: 255, default: null, nullable: true })
    boardId: string | null;

    @ApiProperty({example: '5052d8e6-70d2-46e0-9646-90749210bd6c', description: 'uuid id of column in which task was created'})
    @Column('varchar', { length: 255, default: null, nullable: true })
    columnId: string | null;

}
export { Task };