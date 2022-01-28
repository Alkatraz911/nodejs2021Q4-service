import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: "username", description: 'user name' })
    name: string;

    @ApiProperty({ example: "admin", description: 'user lodin' })
    login: string;

    @ApiProperty({ example: "admin", description: 'user password' })
    password: string;
}