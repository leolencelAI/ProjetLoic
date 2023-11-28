import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Picture } from 'src/picture/entities/picture.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(Picture) private pictureRepository: Repository<Picture>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    const result = await this.articleRepository.save(article);
    return result;
  }

  findAll() {
    return this.articleRepository.find();
  }

  async findOne(id_article: number) {
    const article = await this.articleRepository.findOneBy({ id_article });
    if (!article) {
      return false;
    }
  
    return article; // or return any other data related to the found article
  }

  async update(id_article: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.findOneBy({ id_article });

    if (!article) {
      return 'Aucun Article';
    }

    // Update the properties of the article with the data from updateArticleDto
    Object.assign(article, updateArticleDto);

    if (article.id_picture != article.picture.id_picture) {
      // Load the new picture entity with the updated id_picture
      const newPicture = await this.pictureRepository.findOneBy({
        id_picture: updateArticleDto.id_picture,
      });
      // Update the picture association with the new picture entity
      article.picture = newPicture;
    }
    // Save the updated article to the database
    return this.articleRepository.save(article);
  }

  async remove(id_article: number): Promise<void> {
    const articleToRemove = await this.articleRepository.findOneBy({
      id_article,
    });

    if (!articleToRemove) {
      // You can choose how to handle cases where the article with the given id is not found.
      // Here, I'm throwing an exception, but you can also return a specific message or status code.
      throw new Error(`Article avec l'ID ${id_article} absent!`);
    }

    await this.articleRepository.remove(articleToRemove);
  }
}
