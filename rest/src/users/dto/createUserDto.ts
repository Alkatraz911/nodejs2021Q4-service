import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    
    @ApiProperty({ example: "username", description: 'user name' })
    name: string;

    @IsNotEmpty() @IsString()
    @ApiProperty({ example: "admin", description: 'user login' })
    login: string;

    @IsNotEmpty() @IsString()
    @ApiProperty({ example: "admin", description: 'user password' })
    password: string;
}