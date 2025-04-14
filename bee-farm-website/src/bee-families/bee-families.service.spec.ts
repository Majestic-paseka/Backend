import { Test, TestingModule } from '@nestjs/testing';
import { BeeFamiliesService } from './bee-families.service';

describe('BeeFamiliesService', () => {
  let service: BeeFamiliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeeFamiliesService],
    }).compile();

    service = module.get<BeeFamiliesService>(BeeFamiliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
