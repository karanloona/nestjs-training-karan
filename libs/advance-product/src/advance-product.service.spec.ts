import { Test, TestingModule } from '@nestjs/testing';
import { AdvanceProductService } from './advance-product.service';

describe('AdvanceProductService', () => {
  let service: AdvanceProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvanceProductService],
    }).compile();

    service = module.get<AdvanceProductService>(AdvanceProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
