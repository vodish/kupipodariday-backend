import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsUrl } from "class-validator";

@Entity()
export class Wishlistlist {
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
    items: any; // содержит набор ссылок на подарки
}
