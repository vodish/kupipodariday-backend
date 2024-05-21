import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsUrl, IsDecimal, IsNumber } from "class-validator";

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

    @Column({ type: 'decimal' })
    @IsDecimal()
    raised: number; // сумма донатов

    @Column({ type: 'int', default: 0 })
    @IsNumber()
    copied: number; // содержит cчётчик тех, кто скопировал подарок себе


    // связи
    owner: any; // ссылка на пользователя, который добавил пожелание подарка
    
    offers: any; // массив ссылок на донаты от других пользователей
}
