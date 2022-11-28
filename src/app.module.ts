import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import CONNECTION from './db.connection';
import { ProductsModule } from './products/product.module';

@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ProductsModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
