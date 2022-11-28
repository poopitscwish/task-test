import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "src/articles/entities/article.entity";
import { Product } from "./entities/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product,Article])],
    providers:[ProductsService],
    controllers:[ProductsController]
})

export class ProductsModule{

}