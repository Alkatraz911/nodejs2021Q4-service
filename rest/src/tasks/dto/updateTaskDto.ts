export class UpdateTaskDto {
    title?: string;
    order?: number;
    description?: string;
    userId?: string | null;
    boardId?: string | null;
    columnId?: string | null;
  }