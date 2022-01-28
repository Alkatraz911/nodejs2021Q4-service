import {
    Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'



@Entity({ name: "boards" })
class Board {
    @ApiProperty({example: 'uuid', description: 'uuid uniq id'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: 'title', description: 'boards title'})
    @Column({ length: 255, default: 'boardtitle' })
    title: string;

    @ApiProperty({example: [{"column1":"column content"}, 
    {"column2":"column content"} ], description: 'boards columns'})
    @Column("json")
    columns: object[];
}

export { Board }