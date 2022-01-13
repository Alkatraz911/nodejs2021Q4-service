import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Iboard } from '../../db/data';
import { taskRepository } from '../tasks/task.repository';
import { Board } from './board.model'

@EntityRepository(Board)
class BoardRepository extends Repository<Board> {

    getAllBoards() {
        return this
            .createQueryBuilder()
            .getMany();
    }

    async createBoard(board: Partial<Iboard>) {
        const values = {
            ...board
        };

        const { identifiers } = await this.createQueryBuilder()
            .insert()
            .into(Board)
            .values(values)
            .execute();

        return await this
            .getBoard(identifiers[0]?.['id']);
    }

    async getBoard(id: string) {
        return await this.createQueryBuilder('board')
            .where('board.id = :id', { id })
            .getOne();
    }

    async updateBoard(id: string, updatedBoard: Partial<Iboard>) {
        await this.createQueryBuilder()
            .update(Board)
            .set(updatedBoard)
            .where('id = :id', { id })
            .execute();

        return this.getBoard(id);
    }


    async deleteBoard(id: string) {
        await taskRepository.deleteTasksForBoard(id);
        return await this.createQueryBuilder()
            .delete()
            .from(Board)
            .where('id = :id', { id })
            .execute();
    }

}

const boardRepository = getConnection().getCustomRepository(BoardRepository);
export { boardRepository }