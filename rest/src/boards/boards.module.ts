import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.model';
import { TasksModule } from '../tasks/tasks.module';


@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board]),TasksModule],
  exports: [BoardsService],
})
export class BoardsModule {}
