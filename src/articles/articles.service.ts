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

    async findAll(query): Promise<Article[]> {

        const qb = await this.articlesRepository
            .createQueryBuilder('articles')

        if ('title' in query) {
            qb.andWhere("articles.title LIKE :title", { title: `%${query.title}%` });
        }

        if ('content' in query) {
            qb.andWhere("articles.content LIKE :content", { content: `%${query.content}%` });
        }
        if ('date' in query) {
            qb.andWhere("articles.creationDate LIKE :date", { date: `%${query.date}%` });
        }
        if ('productID' in query) {
            qb.andWhere("articles.productID = :productID", { productID: `${query.productID}` })
        }

        if ('sort' in query) {
            if (query.sort == 'id')
                qb.orderBy('articles.id')
            else
                if (query.sort == 'title')
                    qb.orderBy('articles.title')
                else
                    if (query.sort == 'content')
                        qb.orderBy('articles.content')
                    else
                        if (query.sort == 'date')
                            qb.orderBy('articles.creationDate')
                        else
                            if (query.sort == 'productID')
                                qb.orderBy('articles.productID')
        }

        const article = await qb.getMany();
        return article;
    }
    findOne(id: number) {
        return this.articlesRepository.findOneBy({ id: id });
    }

    create(createArticleDto: CreateArticleDto): Promise<Article> {
        const article = new Article();
        article.title = createArticleDto.title;
        article.content = createArticleDto.content;
        article.creationDate = createArticleDto.creationDate;
        article.productID = createArticleDto.productID;
        return this.articlesRepository.save(article);
    }

    async remove(id: string): Promise<void> {
        await this.articlesRepository.delete(id);
    }

    update(id: number, updateProductDto: UpdateArticleDto) {
        return this.articlesRepository.update(id, updateProductDto);
    }
}
