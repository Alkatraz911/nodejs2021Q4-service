
import { v4 as uuidv4 } from 'uuid';
import { Iuser } from '../../db/data';
import {
  Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';

/**
 * Creates new user.
 * @param id -  uuid v4 id number. No need to pass. It will be cteated automatically by constructor. 
 * @param name - name of user. Required.
 * @param login - users login. Required.
 * @param login - users password. Required.
 */

 @Entity({ name: 'users' })

class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 255, default: 'username' })
  name: string;
  @Column({ length: 255, default: 'login', unique: true })
  login: string;
  @Column({ length: 255, unique: true })
  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }:Iuser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

/**
 * Returns instance of user to response. Without password.   
 * @param user - instance of user.
 * @returns Returns instance od user without password.
 */

  public static toResponse = (user:Iuser):object => {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
export { User };
