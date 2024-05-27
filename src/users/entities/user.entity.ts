import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Length, IsUrl, IsEmail } from "class-validator";
import { Wish } from "src/wishes/entities/wish.entity";
import { Offer } from "src/offers/entities/offer.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({select: false})
    createdAt: Date;

    @UpdateDateColumn({select: false})
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

    @Column({ type: 'varchar', length: 100, select: false })
    password: string;


    // связи
    @OneToMany(() => Wish, (wish) => wish.owner)
    wishes: Wish[]; // список подарков пользователя

    @OneToMany(() => Offer, (offer) => offer.user)
    offers: Offer[]; // список донатов пользователя

    @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
    wishlists: Wishlist[]; // список подборок подарков пользователя
}
