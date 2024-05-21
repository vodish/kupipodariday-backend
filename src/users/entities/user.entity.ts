import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsUrl, IsEmail } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    // поля
    @Column({ type: 'varchar', length: 30, unique: true, })
    @Length(2, 30)
    username: string;

    @Column({ type: 'varchar', length: 200, default: '', })
    @Length(2, 200)
    about: string;

    @Column({ type: 'varchar', length: 1000, default: 'https://i.pravatar.cc/300' })
    @IsUrl()
    avatar: string;


    // авторизация
    @Column({ type: 'varchar', length: 50, unique: true, })
    @IsEmail()
    email: string;

    @Column({ type: 'varchar', length: 32, })
    password: string;


    // связи
    wishes: any; // список подарков пользователя

    offers: any; // список донатов пользователя

    wishlists: any; // список подборок подарков пользователя
}
