import {
  Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'


@Entity({ name: 'users' })
class User  {
  @ApiProperty({example: 'uuid', description: 'uuid uniq id'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({example: 'username', description: 'username'})
  @Column({ length: 255, default: 'username' })
  name: string;

  @ApiProperty({example: 'login', description: 'users login'})
  @Column({ length: 255, default: 'login', unique: true })
  login: string;
  
  @Column({ length: 255, unique: true })
  password: string;

}
export { User };
