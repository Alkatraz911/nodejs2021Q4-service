
import { v4 as uuidv4 } from 'uuid';
import { Iuser } from '../../db/data';

/**
 * Creates new user.
 * @param id -  uuid v4 id number. No need to pass. It will be cteated automatically by constructor. 
 * @param name - name of user. Required.
 * @param login - users login. Required.
 * @param login - users password. Required.
 */

class User {
  id: string;
  name: string;
  login: string;
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
