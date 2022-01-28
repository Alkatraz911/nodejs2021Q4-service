import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service'
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/CreateBoardDto';
import { UpdateBoardDto } from './dto/updateBoardDto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Board } from './board.model';

@Controller('boards')
export class BoardsController {
    constructor(
        private boardsService: BoardsService,
        private tasksService: TasksService,
    ) { }

    @ApiOperation({summary: 'get boards method'})
    @ApiResponse({status: 200, type: [Board]})
    @Get()
    async getBoards() {
        const result = await this.boardsService.getBoards();
        if (result) {
            return result;
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
    @ApiOperation({summary: 'get board method'})
    @ApiResponse({status: 200, type: Board})
    @Get(':id')
    async getBoard(@Param('id') id: string) {
        const result = await this.boardsService.getBoard(id);
        if (result) {
            return result;
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
    @ApiOperation({summary: 'create board method'})
    @ApiResponse({status: 200, type: Board})
    @Post()
    async createBoard(@Body() dto: CreateBoardDto) {
        const result = await this.boardsService.createBoard(dto);
        if (result) {
            return result;
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
    @ApiOperation({summary: 'edit board method'})
    @ApiResponse({status: 200, type: Board})
    @Put(':id')
    async editBoard(@Param('id') id: string, @Body() dto: UpdateBoardDto) {
        const result = await this.boardsService.editBoard(id, dto);
        if (result) {
            return result;
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
    @ApiOperation({summary: 'delete board method'})
    @ApiResponse({status: 200})
    @Delete(':id')
    async deleteBoard(@Param('id') id: string) {
        await this.tasksService.deleteTasksForBoard(id);
        const result = await this.boardsService.deleteBoard(id);
        if (result) {
            return
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
}

