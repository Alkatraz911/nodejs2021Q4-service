
import { v4 as uuidv4 } from 'uuid';
import { Itask } from '../../db/data';



class Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string|null;
  boardId: string|null;
  columnId: string|null;
  constructor({
    id = uuidv4(),
    title = '',
    order = 1,
    description = '',
    userId = null,
    boardId = null,
    columnId = null
  }:Itask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId
  }

  static toResponse(task:Itask) {
    return task;
  }
}
export { Task };