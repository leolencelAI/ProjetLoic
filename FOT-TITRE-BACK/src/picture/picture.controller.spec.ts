import { Test, TestingModule } from '@nestjs/testing';
import { PicturesController } from './picture.controller';
import { PicturesService } from './picture.service';

describe('PictureController', () => {
  let controller: PicturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicturesController],
      providers: [PicturesService],
    }).compile();

    controller = module.get<PicturesController>(PicturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
