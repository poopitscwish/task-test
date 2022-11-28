import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)  // user //,
    private readonly productsRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOneBy({ id: id });
  }

  create(createProductDto: CreateProductDto): Promise<Product>{
    const product = new Product();
    product.title = createProductDto.title;
    product.cost = createProductDto.cost;
    product.description = createProductDto.description
    return this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id,updateProductDto);
  }
}
