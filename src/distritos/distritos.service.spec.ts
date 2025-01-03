import { Test, TestingModule } from '@nestjs/testing';
import { DistritosService } from './distritos.service';

describe('DistritosService', () => {
  let service: DistritosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistritosService],
    }).compile();

    service = module.get<DistritosService>(DistritosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
