
const { v4: uuidv4 } = require('uuid');



class Task {
  constructor({
    id = uuidv4(),
    title = '',
    order = 1,
    description = '',
    userId = '',
    columnId = ''
  } = {}, params = {boardId:''}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = params.boardId;
    this.columnId = columnId
  }

  static toResponse(task) {
    return task;
  }
}

module.exports = Task;