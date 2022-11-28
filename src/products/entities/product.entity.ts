import { Column, Entity,JoinColumn,ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("products")
export class Product{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    title : string
    @Column()
    description:string
    @Column()
    cost:number
}