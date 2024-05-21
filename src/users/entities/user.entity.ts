import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Length, IsUrl, IsEmail } from "class-validator";
import { Wish } from "src/wishes/entities/wish.entity";
import { Offer } from "src/offers/entities/offer.entity";
import { Wishlistlist } from "src/wishlistlists/entities/wishlistlist.entity";

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
    @OneToMany(() => Wish, (wish) => wish.id)
    wishes: Wish[]; // список подарков пользователя

    @OneToMany(() => Offer, (offer) => offer.id)
    offers: Offer[]; // список донатов пользователя

    @OneToMany(() => Wishlistlist, (wishlistlist) => wishlistlist.id)
    wishlists: Wishlistlist[]; // список подборок подарков пользователя
}
