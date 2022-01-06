
import { v4 as uuidv4 } from 'uuid';
import { Iboard } from '../../db/data';

/**
 * Creates new board.
 * @param id -  uuid v4 id number. No need to pass. It will be cteated automatically by constructor. 
 * @param title - title of board. Required.
 * @param columns - columns of board. Required array. Empty array can be passed.  
 */

class Board {
    id: string;
    title: string;
    columns: object[];

  constructor({
    id = uuidv4(),
    title = '',
    columns = []
  }:Iboard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
/**
 * Returns instance od board to response  
 * @param board - instance of borad.
 * @returns Returns instance od board
 */
  public static toResponse = (board:Iboard):Iboard => board
}

export { Board }