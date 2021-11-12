import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

  // @PrimaryColumn() //primary key
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column({
    nullable: true
  })
  password: string;

  // @Column({ default: false })
  // isEmailVerified: boolean;

  // @Column({
  //    nullable: true
  // })
  // password: string;

  // @Column({ default: false })
  // isOnline: boolean;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: string;

}
