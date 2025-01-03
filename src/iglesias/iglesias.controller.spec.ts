import { Test, TestingModule } from '@nestjs/testing';
import { IglesiasController } from './iglesias.controller';

describe('IglesiasController', () => {
  let controller: IglesiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IglesiasController],
    }).compile();

    controller = module.get<IglesiasController>(IglesiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
