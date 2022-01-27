import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';


@Controller('boards')
export class TasksController {
    constructor(private tasksService: TasksService) {

    }

    @Get(':boardId/tasks')
    async getTasks(@Param('boardId') boardId: string) {
        const result = await this.tasksService.getTasks(boardId)
        if(result) {
            return result;
        } else {
            return null;
        }
    }

    @Post(':boardId/tasks')
    async createTask (@Param('boardId') boardId: string, @Body() dto: CreateTaskDto) {
        const result = await this.tasksService.createTask(boardId,dto);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    @Get(':boardId/tasks/:id')
    async getTask(@Param('boardId') boardId: string, @Param('id') id: string) {
        const result = await this.tasksService.getTask(boardId,id);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    @Put(':boardId/tasks/:id')
    async editTask(@Param('boardId') boardId: string, @Param('id') id: string, dto: UpdateTaskDto) {
        const result = await this.tasksService.editTask(boardId,id,dto);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    @Delete(':boardId/tasks/:id') 
    async deleteTask(@Param('boardId') boardId: string, @Param('id') id: string) {
        const result = await this.tasksService.deleteTask(boardId,id);
        if (result) {
            return result;
        } else {
            return null;
        }
    }


}
