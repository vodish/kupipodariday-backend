import { Entity, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsUrl } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    // поля
    @Column({ type: 'varchar', length: 250 })
    @Length(1, 250)
    name: string; // название списка

    @Column({ type: 'varchar', length: 1500 })
    @Length(1500)
    description: string; //описание подборки

    @Column()
    @IsUrl()
    image: string; // обложка для подборки


    // связи
    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToMany(()=>Wish, (wish)=>wish.wishlists)
    @JoinTable()
    wishes: Wish[]; // список подарков
}
