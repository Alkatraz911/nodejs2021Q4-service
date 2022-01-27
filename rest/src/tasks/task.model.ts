import {
    Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';

@Entity({ name: 'tasks' })
class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ length: 255, default: 'tasktitle' })
    title: string;
    @Column('integer', { default: 0 })
    order: number;
    @Column({ length: 255, default: 'description' })
    description: string;
    @Column('varchar', { length: 255, default: null, nullable: true })
    userId: string | null;
    @Column('varchar', { length: 255, default: null, nullable: true })
    boardId: string | null;
    @Column('varchar', { length: 255, default: null, nullable: true })
    columnId: string | null;

}
export { Task };