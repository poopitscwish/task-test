import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Get()
    @ApiOperation({ summary: "Получение списка продуктов" })
    //@ApiParam({ name: "noteId", required: true, description: "Note identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Product })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    findAll() {
        return this.productsService.findAll();
    }
    @Get(':id')
    @ApiOperation({ summary: "Получение продукта по id" })
    //@ApiParam({ name: "noteId", required: true, description: "Note identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Product })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: "Создание продукта" })
    //@ApiParam({ name: "noteId", required: true, description: "Note identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Product })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }
    @Delete(':id')
    remove(@Param('id') id:string) {
        return this.productsService.remove(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateProductrDto:UpdateProductDto) {
        return this.productsService.update(+id,UpdateProductrDto)
    }
}
