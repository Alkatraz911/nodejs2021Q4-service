import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './../auth/auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './task.model';

@ApiTags('Tasks')
@Controller('boards')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'get tasks method' })
  @ApiResponse({ status: 200, type: [Task] })
  @UseGuards(AuthGuard)
  @Get(':boardId/tasks')
  async getTasks(@Param('boardId') boardId: string) {
    const result = await this.tasksService.getTasks(boardId);
    if (result) {
      return result;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'create task method' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(AuthGuard)
  @Post(':boardId/tasks')
  async createTask(
    @Param('boardId') boardId: string,
    @Body() dto: CreateTaskDto,
  ) {
    const result = await this.tasksService.createTask(boardId, dto);
    if (result) {
      return result;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'get task method' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(AuthGuard)
  @Get(':boardId/tasks/:id')
  async getTask(@Param('boardId') boardId: string, @Param('id') id: string) {
    const result = await this.tasksService.getTask(boardId, id);
    if (result) {
      return result;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'edit task method' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(AuthGuard)
  @Put(':boardId/tasks/:id')
  async editTask(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    const result = await this.tasksService.editTask(boardId, id, dto);
    if (result) {
      return result;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'delete task method' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Delete(':boardId/tasks/:id')
  async deleteTask(@Param('boardId') boardId: string, @Param('id') id: string) {
    const result = await this.tasksService.deleteTask(boardId, id);
    if (result) {
      return result;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
