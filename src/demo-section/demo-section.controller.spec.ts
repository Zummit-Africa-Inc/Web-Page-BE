import { Test, TestingModule } from '@nestjs/testing';
import { DemoSectionController } from './demo-section.controller';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';
import { Demo_Requests } from 'src/entities/demo-section.entity';

describe('DemoSectionController', () => {
  let controller: DemoSectionController;
  const createDto = new CreateDemoSectionDto();

  const mockDemoSectionService = {
    create: jest.fn((payload) => {
      return {
        id: 'fake-id',
        ...payload,
      };
    }),

    findAll: jest.fn(() => {
      return [{}];
    }),

    findOneById: jest.fn((id) => {
      return { id, ...createDto };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DemoSectionController,
        Demo_Requests,
        {
          provide: DemoSectionController,
          useValue: mockDemoSectionService,
        },
      ],
    }).compile();

    controller = module.get<DemoSectionController>(DemoSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a demo', async () => {
    expect(controller.create(createDto)).toEqual({
      id: 'fake-id',
      ...createDto,
    });
  });

  it('should return an array of demos', () => {
    expect(controller.findAll()).toEqual([{}]);
  });

  it('should return a demo by Id', () => {
    expect(controller.findOneById('id')).toEqual({
      id: 'id',
      ...createDto,
    });
  });
});
