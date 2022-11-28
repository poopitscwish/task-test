import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {

    constructor(
        @InjectRepository(Article)  // user //,
        private readonly articlesRepository: Repository<Article>,
    ) { }

    async findAll(): Promise<Article[]> {
        return this.articlesRepository.find();
    }
    findOne(id: number) {
        return this.articlesRepository.findOneBy({ id: id });
    }

    create(createArticleDto: CreateArticleDto): Promise<Article> {
        const article = new Article();
        article.title = createArticleDto.title;
        article.content = createArticleDto.content;
        article.creationDate = createArticleDto.creationDate;
        article.productID  = createArticleDto.productID;
        return this.articlesRepository.save(article);
    }

    async remove(id: string): Promise<void> {
        await this.articlesRepository.delete(id);
    }

    update(id: number, updateProductDto: UpdateArticleDto) {
        return this.articlesRepository.update(id, updateProductDto);
    }
}
