import { Itask } from '../../db/data';
import {
  Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';

/**
 * Creates new task.
 * @param id -  uuid v4 id number. No need to pass. It will be cteated automatically by constructor. 
 * @param title - task title. Required.
 * @param order - task order. Required.
 * @param description  - task description. Required.
 * @param userID  - id of the user who created task. 
 * @param boardID  - id of the board in which task was created. 
 * @param columnID  - id of the column in which task was created. 
 */

@Entity({ name: 'tasks' })
class Task implements Itask {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 255, default: 'tasktitle' })
  title: string;
  @Column('integer', { default: 0 })
  order: number;
  @Column({ length: 255, default: 'description' })
  description: string;
  @Column('varchar', { length: 255, default: null, nullable: true })
  userId: string|null;
  @Column('varchar', { length: 255, default: null, nullable: true })
  boardId: string|null;
  @Column('varchar', { length: 255, default: null, nullable: true })
  columnId: string|null;

}
export { Task };