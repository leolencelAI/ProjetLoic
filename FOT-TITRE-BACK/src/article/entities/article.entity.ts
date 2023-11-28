import { Category } from 'src/category/entities/category.entity';
import { Picture } from 'src/picture/entities/picture.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id_article: number;

  @Column()
  titre: string;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  id_category: number;

  @Column()
  id_picture: number;

  @ManyToOne(() => Article, (article) => article.category)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @OneToOne(() => Picture, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_picture' })
  picture: Picture;

  @ManyToMany(() => User, (user) => user.favorites)
  favorites: User[];
}
