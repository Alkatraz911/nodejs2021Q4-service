import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('login')
export class AuthController {

    constructor(private authService: AuthService) {
        
    }

    @Post()
    async login(@Body() userDto:CreateUserDto) {
        try {
            const result = await this.authService.login(userDto)
            return result
  
        } catch(e) {
            throw e;
        } 
    }
}
