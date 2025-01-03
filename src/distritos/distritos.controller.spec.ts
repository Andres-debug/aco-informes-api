import { Test, TestingModule } from '@nestjs/testing';
import { DistritosController } from './distritos.controller';

describe('DistritosController', () => {
  let controller: DistritosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistritosController],
    }).compile();

    controller = module.get<DistritosController>(DistritosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
