import { Test, TestingModule } from '@nestjs/testing';
import { BeeFamiliesController } from './bee-families.controller';

describe('BeeFamiliesController', () => {
  let controller: BeeFamiliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeeFamiliesController],
    }).compile();

    controller = module.get<BeeFamiliesController>(BeeFamiliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
