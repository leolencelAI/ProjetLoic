import * as fs from 'fs';
import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { Picture } from './entities/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture) private pictureRepository: Repository<Picture>,
  ) {}

  create(img: Express.Multer.File) {
    console.log('notre img' + img.originalname);
    return this.pictureRepository.save({
      name: img.filename,
      mimetype: img.mimetype,
      size: img.size,
      description: img.originalname,
    });
  }

  async getImageById(id_picture: number, res): Promise<StreamableFile> {
    const result = await this.pictureRepository.findOneBy({ id_picture });
    if (!result) {
      throw new NotFoundException(`La photo ${id_picture} n'existe pas !`);
    }
    const imageFile = createReadStream(
      join(process.cwd(), 'uploads', result.name),
    );
    res.set('Content-Type', result.mimetype);

    return new StreamableFile(imageFile);
  }

  async deleteImageById(id_picture: number): Promise<boolean> {
    const image = await this.pictureRepository.findOneBy({ id_picture });

    if (!image) {
      throw new NotFoundException(
        `The photo with ID ${id_picture} is not found.`,
      );
    }

    const imageFilePath = join(process.cwd(), 'uploads', image.name);

    // Attempt to delete the image file from the file system
    try {
      fs.unlinkSync(imageFilePath); // Synchronously delete the file
    } catch (error) {
      // Handle any potential errors that may occur during file deletion
      console.error(`Error la de la suppresion: ${error}`);
    }

    // Delete the image record from the database
    await this.pictureRepository.remove(image);

    return true;
  }
}
