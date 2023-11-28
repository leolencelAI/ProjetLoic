import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Res,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PicturesService } from './picture.service';
//import { CreatePictureDto } from './dto/create-picture.dto';
// import { UpdatePictureDto } from './dto/update-picture.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminJwtAuthGuard } from 'src/guards/jwt-admin.guard';

@Controller('picture')
export class PicturesController {
  constructor(private readonly pictureService: PicturesService) {}

  @UseGuards(AdminJwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('monFichier'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.pictureService.create(file);
  }

  @Get(':id')
  getImageById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    return this.pictureService.getImageById(+id, res);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    // Call the pictureService method to delete the image by ID
    const result = await this.pictureService.deleteImageById(+id);

    if (result) {
      return { message: "Suppression de l'image avec succès" };
    } else {
      return { message: 'Aucune image à supprimer' };
    }
  }
}
