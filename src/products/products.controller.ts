import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

    @Get()
    getAll() {
        return "13211"
    }
    @Get(':id')
    getOne(@Param('id') id: string) {
        return ""
    }

    @Post()
    create(@Body() CreateProductDto:CreateProductDto) {
        return `Title:` 
    }
    @Delete()
    remove() {

    }

    @Put()
    update() {

    }
}
