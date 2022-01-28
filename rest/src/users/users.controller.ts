import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
import { TasksService } from "../tasks/tasks.service";
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('users')
export class UsersController {

    constructor(
        private  userService: UsersService,
        private  tasksService: TasksService,
    ){}

    @Get()
    async getUsers() {
        const users = await this.userService.getUsers();
        return users.map((user) => this.userService.toResponse(user));
    }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const result = await this.userService.createUser(dto);
        if (result) {
            return this.userService.toResponse(result);
        } else {
            return null;
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        const result = await this.userService.getUser(id);
        if (result) {
            return this.userService.toResponse(result);
        } else {
            return null;
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        const result = await this.userService.updateUser(id, dto);
        if (result) {
            return this.userService.toResponse(result);
        } else {
            return null;
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        await this.tasksService.unSignUser(id);
        return 
    }

}
