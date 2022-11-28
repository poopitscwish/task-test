import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ArticlesController } from './articles/articles.controller';
import CONNECTION from './db.connection';

@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
    ...CONNECTION,
    synchronize:false,
    autoLoadEntities:true
    }),

  ],
  controllers: [AppController, ProductsController, ArticlesController],
  providers: [AppService],
})
export class AppModule {}
