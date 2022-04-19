import { Test, TestingModule } from '@nestjs/testing';
import { InternshipCategoryContoller } from './internshipCategories.controllers';
import { InternshipCategoryDto } from './dto/internshipCategory.dto';
import { InternshipCategory } from '../entities/intershipCategory.entity';

describe('InternshipCategory Controller', () => {
    let mockIntCatController : InternshipCategoryContoller
    let intCatDto = new InternshipCategoryDto()
    intCatDto.categoryName = 'WEB DEVELOPMENT'

    const intCatController = {
        addIntCatergory: jest.fn().mockImplementation((body) => {
            return {
                id: 'string-uuid',
                ...body,
            }
        }),
        allCategories: jest.fn(() => {
            return [{}, {}]
        }),

        showOneCategoryByName: jest.fn().mockImplementation((body: string) => {
            return {
                id: 'string-uuid',
                categoryName: body,
                ...intCatDto
            }
        }),
        showOneCategorybyId: jest.fn().mockImplementation((id: string) => {
            return {
                id: id,
                ...intCatDto
            }
        }),

        

    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InternshipCategoryContoller,
                InternshipCategory,
                {
                    provide: InternshipCategoryContoller,
                    useValue: intCatController
                }
            ]
        }).compile()

        mockIntCatController = module.get<InternshipCategoryContoller>(InternshipCategoryContoller)
    })

    it('should add new internship category', () => {
        expect(mockIntCatController.addIntCatergory(intCatDto)).toEqual({
            id: 'string-uuid',
            ...intCatDto
        })
    })

    it('should show all internship category', () => {
        expect(mockIntCatController.allCategories()).toEqual([{},{}])
    })

    it('should fetch an internship category by name input', () => {
        expect(mockIntCatController.showOneCategoryByName(intCatDto)).toEqual({
            id: 'string-uuid',
            ...intCatDto
        })
    })

    it('should fetch an internship category by id', () => {
        expect(mockIntCatController.showOneCategorybyId('string-uuid')).toEqual({
            id: 'string-uuid',
            ...intCatDto
        })
    })


    

})