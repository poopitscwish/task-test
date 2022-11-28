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

  async findAll(query): Promise<Product[]> {

    const qb = await this.productsRepository
      .createQueryBuilder('products')

    if ('title' in query) {
      qb.andWhere("products.title LIKE :title", { title: `%${query.title}%` });
    }

    if ('description' in query) {
      qb.andWhere("products.description LIKE :description", { description: `%${query.description}%` });
    }

    if ('cost' in query) {
      qb.andWhere("products.cost = :cost", { cost: `${query.cost}` })
    }

    // if('sort=id' in query){
    //   qb.orderBy('products.id');
    // }
    // if('sort=title' in query){
    //   qb.orderBy('products.title');
    // }
    if ('sort' in query) {
      if (query.sort == 'id')
        qb.orderBy('products.cost')
      else
        if (query.sort == 'title')
          qb.orderBy('products.title')
        else
          if (query.sort == 'description')
            qb.orderBy('products.description')
          else
            if (query.sort == 'cost')
              qb.orderBy('products.cost')
    }

    const product = await qb.getMany();
    return product;
  }

  findOne(id: number) {
    return this.productsRepository.findOneBy({ id: id });
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
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
    return this.productsRepository.update(id, updateProductDto);
  }
}
