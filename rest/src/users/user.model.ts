import {
  Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';


@Entity({ name: 'users' })
class User  {
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
