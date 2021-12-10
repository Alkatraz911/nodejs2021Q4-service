
import { v4 as uuidv4 } from 'uuid';
import { Iboard } from '../../db/data';


class Board {
    id: string;
    title: string;
    columns: object[]|undefined;

  constructor({
    id = uuidv4(),
    title = '',
    columns = [{}]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  public static toResponse = (board:Iboard):Iboard => board
}

export { Board }