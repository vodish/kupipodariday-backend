import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsUrl, IsDecimal } from "class-validator";

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
    item: any;
    
    user: any;
}
