import { Test, TestingModule } from '@nestjs/testing';
import { IglesiasService } from './iglesias.service';

describe('IglesiasService', () => {
  let service: IglesiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IglesiasService],
    }).compile();

    service = module.get<IglesiasService>(IglesiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
