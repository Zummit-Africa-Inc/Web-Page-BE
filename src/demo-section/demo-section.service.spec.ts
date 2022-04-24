import { Test, TestingModule } from '@nestjs/testing';
import { Demo_Requests } from 'src/entities/demo-section.entity';
import { DemoSectionService } from './demo-section.service';
import { CreateDemoSectionDto } from './dto/createDemoSectionDto.dto';

describe('DemoSectionController', () => {
  let service: DemoSectionService;
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
        DemoSectionService,
        Demo_Requests,
        {
          provide: DemoSectionService,
          useValue: mockDemoSectionService,
        },
      ],
    }).compile();

    service = module.get<DemoSectionService>(DemoSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a demo', async () => {
    expect(service.create(createDto)).toEqual({
      id: 'fake-id',
      ...createDto,
    });
  });
  it('should return an array of all demos', async () => {
    expect(service.findAll()).toEqual([{}]);
  });
  it('should return a demo by Id', () => {
    expect(service.findOneById('id')).toEqual({
      id: 'id',
      ...createDto,
    });
  });
});
