import { Entity, Column,PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Todos {

    // @PrimaryColumn() //primary key
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    // @Column()
    // email: string;
   //  @Column()
   //  hashedPassword: string;
   //
    @Column({
      type: 'timestamp',
      default: () => "CURRENT_TIMESTAMP"
   })
    createdAt: string;
   // @Column()
   // @CreateDateColumn()
   // createdAt: Date;
}
