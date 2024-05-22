import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsUrl, IsDecimal } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    // поля
    @Column({ type: 'decimal' })
    @IsDecimal()
    amount: number; // сумма заявки, округляется до двух знаков после запятой

    @Column({ type: 'boolean', default: false })
    hidden: boolean;


    // связи
    @ManyToOne(()=>User, (user) => user.id)
    user: User;

    @ManyToOne(()=>Wish, (wish) => wish.id)
    item: Wish;
}
