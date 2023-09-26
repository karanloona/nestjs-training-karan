import { Test, TestingModule } from '@nestjs/testing';
import { AdvanceProfileService } from './advance-profile.service';

describe('AdvanceProfileService', () => {
  let service: AdvanceProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvanceProfileService],
    }).compile();

    service = module.get<AdvanceProfileService>(AdvanceProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
