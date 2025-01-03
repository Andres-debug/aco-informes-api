import { Test, TestingModule } from '@nestjs/testing';
import { ZonasController } from './zonas.controller';

describe('ZonasController', () => {
  let controller: ZonasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZonasController],
    }).compile();

    controller = module.get<ZonasController>(ZonasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
