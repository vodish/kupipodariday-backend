import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  username: string;

  @Column()
  about: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

//   @Column()
//   wishes: string;
  
//   @Column()
//   offers: string;
  
//   @Column()
//   wishlists: string;
}
