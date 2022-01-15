
import {
  Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';
import { Iuser } from '../../db/data';

/**
 * Creates new user.
 * @param id -  uuid v4 id number. No need to pass. It will be cteated automatically by constructor. 
 * @param name - name of user. Required.
 * @param login - users login. Required.
 * @param login - users password. Required.
 */


@Entity({ name: 'users' })
class User implements Iuser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 255, default: 'username' })
  name: string;
  @Column({ length: 255, default: 'login', unique: true })
  login: string;
  @Column({ length: 255, unique: true })
  password: string;

}
export { User };
