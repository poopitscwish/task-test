import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}
    @Get()
    @ApiOperation({ summary: "Получение списка продуктов" })
    //@ApiParam({ name: "noteId", required: true, description: "Note identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Article })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    async findAll(@Query() query):Promise<Article[]> {
        return await this.articlesService.findAll(query);
    }
    @Get(':id')
    @ApiOperation({ summary: "Получение статьи по id" })
    //@ApiParam({ name: "noteId", required: true, description: "Note identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Article })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    findOne(@Param('id') id: string) {
        return this.articlesService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: "Создание статьи" })
    //@ApiParam({ name: "noteId", required: true, description: "Note identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Article })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    create(@Body() CreateArticleDto: CreateArticleDto) {
        return this.articlesService.create(CreateArticleDto);
    }
    @Delete(':id')
    remove(@Param('id') id:string) {
        return this.articlesService.remove(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateArticleDto: UpdateArticleDto) {
        return this.articlesService.update(+id, UpdateArticleDto)
    }
}
