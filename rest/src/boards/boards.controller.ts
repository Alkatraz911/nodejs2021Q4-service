import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service'
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/CreateBoardDto';
import { UpdateBoardDto } from './dto/updateBoardDto';

@Controller('boards')
export class BoardsController {
    constructor(
        private boardsService: BoardsService,
        private tasksService: TasksService,
    ) { }

    @Get()
    async getBoards() {
        const result = await this.boardsService.getBoards();
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    @Get(':id')
    async getBoard(@Param('id') id:string) {
        const result = await this.boardsService.getBoard(id);
        if (result) {
            return result;
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
    
    @Post()
    async createBoard(@Body() dto:CreateBoardDto) {
        const result = await this.boardsService.createBoard(dto);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    @Put(':id')
    async editBoard(@Param('id') id:string,@Body() dto:UpdateBoardDto) {
        const result = await this.boardsService.editBoard(id,dto);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    @Delete(':id')
    async deleteBoard(@Param('id') id:string) {
        await this.tasksService.deleteTasksForBoard(id);
        await this.boardsService.deleteBoard(id);
        return
    }

}

