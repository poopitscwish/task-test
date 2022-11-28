import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { Article } from "./entities/article.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product,Article])],
    providers:[ArticlesService],
    controllers:[ArticlesController]
})
export class ArticlesModule{}