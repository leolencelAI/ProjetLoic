import { Module } from '@nestjs/common';
import { PicturesService } from './picture.service';
import { PicturesController } from './picture.controller';
import { Picture } from './entities/picture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MulterModule.register({
      dest: 'uploads',
    }),
    TypeOrmModule.forFeature([Picture]),
    PassportModule.register({ defaultStrategy: 'jwt-admin' }),
  ],
  controllers: [PicturesController],
  providers: [PicturesService],
  exports: [TypeOrmModule.forFeature([Picture])],
})
export class PictureModule {}
