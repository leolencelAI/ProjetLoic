import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { PictureModule } from 'src/picture/picture.module';
import { JwtStrategy, JwtAdminStrategy } from 'src/guards/jwt.strategy';

@Module({
  imports: [
    PictureModule,
    TypeOrmModule.forFeature([Article]),
    PassportModule.register({ defaultStrategy: 'jwt-admin' }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, JwtAdminStrategy],
  exports: [TypeOrmModule.forFeature([Article])],
})
export class ArticleModule {}
