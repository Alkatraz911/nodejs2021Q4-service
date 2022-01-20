import { EntityRepository, Repository, getConnection } from 'typeorm';
import {hash, genSalt} from 'bcrypt';
import { User } from './user.model';
import { Iuser } from '../../db/data';
import { taskRepository } from '../tasks/task.repository';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  getAllUsers() {
    return this
      .createQueryBuilder()
      .getMany();
  }

  async createUser(user: Partial<Iuser>) {
    if (user.password) {
      const passHash = await hash(user.password, await genSalt(10));
      const values = {
        ...user
      };
      values.password = passHash
      const { identifiers } = await this.createQueryBuilder()
        .insert()
        .into(User)
        .values(values)
        .execute();

      return this.getUser(identifiers[0]?.id);
    } 
    return null
  }

  getUser(id: string) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async updateUser(id: string, updatedUser: Partial<Iuser>) {
    await this.createQueryBuilder()
      .update(User)
      .set(updatedUser)
      .where('id = :id', { id })
      .execute();

    return this.getUser(id);
  }

  async deleteUser(id: string) {
    await taskRepository.unAssignUser(id)
    return this.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }

  static toResponse({ id, name, login }: Iuser) {
    return { id, name, login }
  }
}

const userRepository = getConnection().getCustomRepository(UserRepository);
export { userRepository }