import { Test, TestingModule } from '@nestjs/testing';
import { InformesController } from './informes.controller';

describe('InformesController', () => {
  let controller: InformesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformesController],
    }).compile();

    controller = module.get<InformesController>(InformesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
