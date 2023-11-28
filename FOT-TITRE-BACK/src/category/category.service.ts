import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    const result = await this.categoryRepository.save(category);
    return result;
  }

  findAll() {
    return this.categoryRepository.find();
  }
}
