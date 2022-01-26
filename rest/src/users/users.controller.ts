import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {

constructor(private userService: UsersService ) {

    }

    @Get()
    async getUsers() {
        const users = await this.userService.getUsers();
        return users.map((user) => this.userService.toResponse(user));
      }

    @Post()
    async createUser(@Body() dto:CreateUserDto) {
        const result = await this.userService.createUser(dto);
        if(result) {
            return this.userService.toResponse(result)
        } else {
            return null
        }
    }
}
