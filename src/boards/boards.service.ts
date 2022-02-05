import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.model';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/CreateBoardDto';
import { UpdateBoardDto } from './dto/updateBoardDto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  getBoards() {
    return this.boardsRepository.createQueryBuilder().getMany();
  }

  async createBoard(board: CreateBoardDto) {
    const values = {
      ...board,
    };

    const { identifiers } = await this.boardsRepository
      .createQueryBuilder()
      .insert()
      .into(Board)
      .values(values)
      .execute();

    return this.getBoard(identifiers[0]?.id);
  }

  getBoard(id: string) {
    return this.boardsRepository
      .createQueryBuilder('board')
      .where('board.id = :id', { id })
      .getOne();
  }

  async editBoard(id: string, updatedBoard: UpdateBoardDto) {
    await this.boardsRepository
      .createQueryBuilder()
      .update(Board)
      .set(updatedBoard)
      .where('id = :id', { id })
      .execute();

    return this.getBoard(id);
  }

  async deleteBoard(id: string) {
    return this.boardsRepository
      .createQueryBuilder()
      .delete()
      .from(Board)
      .where('id = :id', { id })
      .execute();
  }
}
