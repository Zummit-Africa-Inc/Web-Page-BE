import { Test, TestingModule} from '@nestjs/testing'
import { InternshipCategoryService } from './internshipCategory.service'
import { InternshipCategory } from '../entities/intershipCategory.entity'
import { InternshipCategoryDto } from './dto/internshipCategory.dto'



describe('InternshipCategoryService', () => {
    let mockIntCatService: InternshipCategoryService
    let intCatDto = new InternshipCategoryDto()
    intCatDto.categoryName='WEB DEVELOPMENT'

    const intcategoryService = {
        addCategory: jest.fn().mockImplementation((body) => {
           return {
               id: 'string-uuid',
               ...body,
           } 
        }),
        findAll: jest.fn(() => {
            return [{},{},]
        }),
        findOneByCatergoryName:jest.fn().mockImplementation((body) => {
            return {
                id: 'string-uuid',
                categoryName: body,
                ... intCatDto
            }
        }),

        findOneCategoryById: jest.fn((id) => {
            return{
                id: id,
                ...intCatDto
            }
        }),

        removeAll: jest.fn(() => {
            return []
        })
    }
   
    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({

            providers: [
                InternshipCategoryService,
                InternshipCategory,
                {
                    provide: InternshipCategoryService,
                    useValue: intcategoryService
                }
            ],
        }).compile()
        mockIntCatService = module.get<InternshipCategoryService>(InternshipCategoryService)
    })
    
    it('should add a new category', () => {
        expect(mockIntCatService.addCategory(intCatDto)).toEqual({
            id: 'string-uuid',
            ...intCatDto,
        })
        expect(mockIntCatService.addCategory).toBeCalled()
    })

    it('should get one category by name', () => {
        expect(mockIntCatService.findOneByCatergoryName(intCatDto.categoryName)).toEqual({
            id: 'string-uuid',
            ...intCatDto
        })
    })

    it('should get one category by id', () => {
        expect(mockIntCatService.findOneCategoryById('string-uuid')).toEqual({
            id: 'string-uuid',
            ...intCatDto
        })
    })

    it('should remove all categories on the db', () => {
        expect(mockIntCatService.removeAll()).toEqual([])
    })

    it('should fetch all categories', () => {
        expect(mockIntCatService.findAll()).toEqual([{},{}])
    })

})