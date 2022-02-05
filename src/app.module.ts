import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './middlewares/logging.interceptor';
import  ormConfig  from './common/ormconfig';
// import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    FileModule,
  ],
})
export class AppModule {}
