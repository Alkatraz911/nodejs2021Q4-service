
import { v4 as uuidv4 } from 'uuid';
import { Itask } from '../../db/data';

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

/**
 * Returns instance od task passed in method.
 * @param task - instance of user.
 * @returns Returns instance od task passed in method.
 */

  static toResponse(task:Itask) {
    return task;
  }
}
export { Task };