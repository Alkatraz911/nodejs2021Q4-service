import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.model';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) { }

    getTasks(boardId: string) {
        return this.tasksRepository.createQueryBuilder('task')
            .where('task.boardId = :boardId', { boardId })
            .getMany();
    }

    getTask(boardId: string, taskId: string) {
        return this.tasksRepository.createQueryBuilder('task')
            .where('task.boardId = :boardId', { boardId })
            .andWhere('task.id = :taskId', { taskId })
            .getOne();
    }

    async createTask(boardId: string, task: CreateTaskDto) {
        const { generatedMaps } = await this.tasksRepository.createQueryBuilder()
            .insert()
            .into(Task)
            .values([{ ...task, boardId }])
            .execute();

        return this.getTask(generatedMaps?.[0]?.boardId, generatedMaps?.[0]?.id);
    }

    async editTask(boardId: string, taskId: string, updatedTask: UpdateTaskDto) {
        await this.tasksRepository.createQueryBuilder()
            .update(Task)
            .set(updatedTask)
            .where('boardId = :boardId', { boardId })
            .andWhere('id = :taskId', { taskId })
            .execute();

        return this.getTask(boardId, taskId)
    }

    deleteTask(boardId: string, taskId: string) {
        return this.tasksRepository.createQueryBuilder()
            .delete()
            .from(Task)
            .where('boardId = :boardId', { boardId })
            .andWhere('id = :taskId', { taskId })
            .execute();
    }

    unSignUser(userId: string) {
        return this.tasksRepository.createQueryBuilder()
            .update(Task)
            .set({ userId: null })
            .where('userId = :userId', { userId })
            .execute();
    }


    deleteTasksForBoard(boardId: string) {
        return this.tasksRepository.createQueryBuilder()
            .delete()
            .from(Task)
            .where('boardId = :boardId', { boardId })
            .execute();
    }
}
