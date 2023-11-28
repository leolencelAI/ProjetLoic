import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Article } from 'src/article/entities/article.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findOne(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id_users: id },
    });
    if (!userFound) {
      throw new NotFoundException(`l\'id numéro ${id} n'existe pas !`);
    }
    return userFound;
  }

  async addToFavorites(userId: number, articleId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id_users: userId },
        relations: ['favorites'],
      });

      if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
      }

      const article = await this.articleRepository.findOneBy({
        id_article: articleId,
      });

      if (!article) {
        throw new NotFoundException('Article non trouvé');
      }

      const isArticleInFavorites = user.favorites.some(
        (favorite) => favorite.id_article === articleId,
      );

      if (!isArticleInFavorites) {
        user.favorites.push(article);
        await this.userRepository.save(user);
      }
      const userWithFavorites = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.favorites', 'favorites')
        .where('user.id_users = :userId', { userId })
        .getOne();

      if (!userWithFavorites) {
        throw new NotFoundException('Utilisateur non trouvé');
      }

      return userWithFavorites;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erreur interne du serveur');
    }
  }

  async getUserFavorites(userId: number): Promise<Article[]> {
    const user = await this.userRepository.findOne({
      where: { id_users: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user.favorites;
  }

  async removeFromFavorites(userId: number, articleId: number) {
    const user = await this.userRepository.findOne({
      where: { id_users: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const favoriteIndex = user.favorites.findIndex(
      (favorite) => favorite.id_article === articleId,
    );

    if (favoriteIndex === -1) {
      throw new NotFoundException(
        "Article non trouvé dans les favoris de l'utilisateur",
      );
    }

    user.favorites.splice(favoriteIndex, 1);
    await this.userRepository.save(user);
  }
}
