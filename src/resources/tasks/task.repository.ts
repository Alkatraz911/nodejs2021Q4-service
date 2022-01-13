import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Itask } from '../../db/data';
import { Task } from './task.model';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {

  getAllTasks(boardId: string) {
    return this.createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .getMany();
  }

  async createTask(boardId: string, task: Partial<Itask>) {
    const { generatedMaps } = await this.createQueryBuilder()
      .insert()
      .into(Task)
      .values([{ ...task, boardId }])
      .execute();

    return this.getTask(generatedMaps?.[0]?.['boardId'], generatedMaps?.[0]?.['id']);
  }

  getTask(boardId: string, taskId: string) {
    return this.createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .andWhere('task.id = :taskId', { taskId })
      .getOne();
  }

  async editTask(boardId: string, taskId: string, updatedTask:Partial<Itask>){
    await this.createQueryBuilder()
      .update(Task)
      .set(updatedTask)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :taskId', { taskId })
      .execute();

    return this.getTask(boardId, taskId)
  }

  deleteTask(boardId: string, taskId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Task)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :taskId', { taskId })
      .execute();
  }

  unAssignUser(userId: string) {
    return this.createQueryBuilder()
      .update(Task)
      .set({userId: null})
      .where('userId = :userId', { userId })
      .execute();
  }


  deleteTasksForBoard(boardId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Task)
      .where('boardId = :boardId', { boardId })
      .execute();
  }
}

const taskRepository = getConnection().getCustomRepository(TaskRepository);
export { taskRepository }