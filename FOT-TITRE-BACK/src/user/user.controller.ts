import { Controller, Delete, Param, Post, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Article } from 'src/article/entities/article.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId/favorites/:articleId')
  async addToFavorites(
    @Param('userId') userId: number,
    @Param('articleId') articleId: number,
  ): Promise<User> {
    return this.userService.addToFavorites(userId, articleId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/favorites')
  async getUserFavorites(@Param('userId') userId: number): Promise<Article[]> {
    return this.userService.getUserFavorites(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/favorites/:articleId')
  async removeFromFavorites(
    @Param('userId') userId: number,
    @Param('articleId') articleId: number,
  ) {
    await this.userService.removeFromFavorites(+userId, Number(articleId));
  }
}
