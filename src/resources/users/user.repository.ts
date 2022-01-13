import { EntityRepository, Repository, getConnection } from 'typeorm';
import { User } from './user.model';
import { Iuser } from '../../db/data';
import { taskRepository } from '../tasks/task.repository';


@EntityRepository(User)
class UserRepository extends Repository<User> {

  getAllUsers() {
    return  this
    .createQueryBuilder()
    .getMany();
  }

  async createUser(user: Partial<Iuser>) {
    const values = {
      ...user
    };

    const { identifiers } = await this.createQueryBuilder()
      .insert()
      .into(User)
      .values(values)
      .execute();

    return await this.getUser(identifiers[0]?.['id']);
  }

  async getUser(id: string) {
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
    return await this.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }

  toResponse({id, name, login}: Iuser) {
    return {id, name, login}
  }
}

const userRepository = getConnection().getCustomRepository(UserRepository);
export { userRepository }