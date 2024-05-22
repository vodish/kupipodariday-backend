import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsUrl } from "class-validator";
import { User } from "src/users/entities/user.entity";

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

    items: any; // содержит набор ссылок на подарки
}