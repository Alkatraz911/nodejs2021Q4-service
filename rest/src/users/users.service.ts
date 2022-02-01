import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { hash, genSalt } from 'bcrypt';
import { CreateUserDto } from "./dto/createUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        
    ){}

    getUsers() {
        return this.userRepository
            .createQueryBuilder()
            .getMany();
    }

    async createUser(dto: CreateUserDto) {
        if (dto.password) {
            const passHash = await hash(dto.password, await genSalt(10));
            const values = {
                ...dto
            };
            values.password = passHash
            const { identifiers } = await this.userRepository.createQueryBuilder()
                .insert()
                .into(User)
                .values(values)
                .execute();

            return this.getUser(identifiers[0]?.id);
        }
        return null
    }

    getUser(id: string) {
        return this.userRepository.createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }

    async updateUser(id: string, dto: UpdateUserDto) {
        await this.userRepository.createQueryBuilder()
            .update(User)
            .set(dto)
            .where('id = :id', { id })
            .execute();

        return this.getUser(id);
    }

    async deleteUser(id: string) {
        
        return this.userRepository.createQueryBuilder()
            .delete()
            .from(User)
            .where('id = :id', { id })
            .execute();
    }

    toResponse({ id, name, login }: User) {
        return { id, name, login };
    }

}