import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsUrl, IsDecimal, IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    // обычные поля
    @Column({ type: 'varchar', length: 250, })
    @Length(1, 250)
    name: string; // название подарка

    @Column({ type: 'varchar', length: 1024 })
    @Length(1, 1024)
    description: string;  // строка с описанием подарка длиной от 1 и до 1024 символов

    @Column()
    @IsUrl()
    link: string; //  ссылка на страницу интернет-магазина

    @Column()
    @IsUrl()
    image: string; // url картинки подарки

    @Column({ type: 'decimal' })
    @IsDecimal()
    price: number; //  стоимость подарка, с округлением до сотых, число.

    @Column({ type: 'decimal', default: 0 })
    @IsDecimal()
    raised: number; // сумма донатов

    @Column({ type: 'int', default: 0 })
    @IsNumber()
    copied: number; // содержит cчётчик тех, кто скопировал подарок себе


    // связи
    @ManyToOne(() => User, (user) => user.id)
    owner: User; // ссылка на пользователя, который добавил пожелание подарка

    @ManyToMany(()=>Wishlist, (wishlist)=>wishlist.wishes)
    wishlists: Wishlist[]; // список альбомов
}
