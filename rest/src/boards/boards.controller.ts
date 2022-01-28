import { AuthGuard } from './../auth/auth.guard';
import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service'
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/CreateBoardDto';
import { UpdateBoardDto } from './dto/updateBoardDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Board } from './board.model';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
    constructor(
        private boardsService: BoardsService,
        private tasksService: TasksService,
    ) { }

    @ApiOperation({summary: 'get boards method'})
    @ApiResponse({status: 200, type: [Board]})
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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

