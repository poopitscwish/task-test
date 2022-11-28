import { Column, Entity,JoinColumn,ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities/product.entity";


@Entity("articles")
export class Article{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne((type) => Product, (product) => product.id)
    @JoinColumn([{ name: "productID" }])
    productID: number
    @Column()
    title:string
    @Column()
    content:string
    @Column()
    creationDate: Date
}