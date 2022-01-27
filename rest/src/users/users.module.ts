import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';




@Module({
  controllers: [UsersController],
  providers:[UsersService],
  imports: [TypeOrmModule.forFeature([User]), TasksModule],
  exports: [UsersService],
})
export class UsersModule {}
