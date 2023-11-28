import { Article } from 'src/article/entities/article.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id_users: number;

  @Column()
  firstname: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @ManyToMany(() => Article, (article) => article.favorites, { cascade: true })
  @JoinTable({
    name: 'favorite',
    joinColumn: {
      name: 'id_users',
      referencedColumnName: 'id_users',
    },
    inverseJoinColumn: {
      name: 'id_article',
      referencedColumnName: 'id_article',
    },
  })
  favorites: Article[];
}
