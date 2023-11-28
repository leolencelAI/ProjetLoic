import { Article } from 'src/article/entities/article.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id_category: number;

  @Column()
  name: string;
  @OneToMany(() => Category, (category) => category.article)
  @JoinColumn({ name: 'id_article' })
  article: Article;
}
