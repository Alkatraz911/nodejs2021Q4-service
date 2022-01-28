import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(userDto: CreateUserDto) {
        const { login, password } = userDto;
        if (!login || !password) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        } else {
            const user = (await this.userService.getUsers())
                .find(el => el.login === login)
            if (!user) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
            } else {
                const isValid = await compare(password, user.password);
                if (isValid) {
                    const token = this.jwtService.sign({id:user.id, login:user.login},{secret:process.env.JWT_SECRET});
                    return { token: token }
                } else {
                    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
                }
            }
        }
    }
}
