import { Test, TestingModule } from '@nestjs/testing';
import { AdvanceAuthService } from './advance-auth.service';

describe('AdvanceAuthService', () => {
  let service: AdvanceAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvanceAuthService],
    }).compile();

    service = module.get<AdvanceAuthService>(AdvanceAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
