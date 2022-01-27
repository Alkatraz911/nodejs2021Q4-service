import {
    Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';



@Entity({ name: "boards" })
class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ length: 255, default: 'boardtitle' })
    title: string;
    @Column("json")
    columns: object[];
}

export { Board }