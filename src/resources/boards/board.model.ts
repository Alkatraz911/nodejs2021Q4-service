import {
  Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';
import { Iboard } from '../../db/data';

/**
 * Creates new board.
 * @param id -  uuid v4 id number. No need to pass. It will be cteated automatically by constructor. 
 * @param title - title of board. Required.
 * @param columns - columns of board. Required array. Empty array can be passed.  
 */

@Entity({name: "boards"})
class Board implements Iboard {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  @Column({ length: 255, default: 'boardtitle' })    
    title: string;
  @Column("json")  
    columns: object[];
}

export { Board }