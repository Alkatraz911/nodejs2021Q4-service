
import { stringify, v4 as uuidv4 } from 'uuid';
import { Itask } from '../../db/data';



class Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string|null;
  boardId: string;
  columnId: string|null;
  params: object;
  constructor({
    id = uuidv4(),
    title = '',
    order = 1,
    description = '',
    userId = null,
    columnId = null
  } = {}, params = {boardId:''}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = params.boardId;
    this.columnId = columnId
  }

  static toResponse(task:Itask) {
    return task;
  }
}
export { Task };