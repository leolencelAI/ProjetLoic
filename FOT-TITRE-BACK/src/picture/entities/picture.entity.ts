import { Article } from 'src/article/entities/article.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'picture' })
export class Picture {
  @PrimaryGeneratedColumn()
  id_picture: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @OneToOne(() => Article, (article) => article.picture)
  article: Article;
}
