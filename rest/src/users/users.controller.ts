import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
import { TasksService } from "../tasks/tasks.service";
import { UpdateUserDto } from './dto/updateUserDto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { User } from './user.model';


@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService,
        private tasksService: TasksService,
    ) { }

    @ApiOperation({summary: 'get users method'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    async getUsers() {
        const users = await this.userService.getUsers();
        if (users) {
            return users.map((user) => this.userService.toResponse(user));
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

    }

    @ApiOperation({summary: 'user create method'})
    @ApiResponse({status: 200, type: User})
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const result = await this.userService.createUser(dto);
        if (result) {
            return this.userService.toResponse(result);
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation({summary: 'get user method'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    async getUser(@Param('id') id: string) {
        const result = await this.userService.getUser(id);
        if (result) {
            return this.userService.toResponse(result);
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation({summary: 'update user method'})
    @ApiResponse({status: 200, type: User})
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        const result = await this.userService.updateUser(id, dto);
        if (result) {
            return this.userService.toResponse(result);
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation({summary: 'delete user method'})
    @ApiResponse({status: 200})
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.tasksService.unSignUser(id);
        const result = await this.userService.deleteUser(id);
        if (result) {
            return
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

}
