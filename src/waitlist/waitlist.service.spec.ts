import { Test, TestingModule} from '@nestjs/testing'
import { WaitlistsService } from './waitlist.service'
import { Waitlist } from '../entities/waitlist.entity'
import { WaitlistDto } from './dto/waitlist.dto'

describe('WaitlistService', () => {
    let mockWaitlistService: WaitlistsService
    let waitlistDto = new WaitlistDto()
    waitlistDto.category = 'WEB DEVELOPMENT'
    waitlistDto.email = 'batman@gmail.com'

    const waitlistService = {
        addToWaitlist: jest.fn((body) => {
            return {
                id: 'string-uuid',
                ...body,
            }
        }),
        findAll: jest.fn(() => {
            return [{}, {}]
        })

    }

    
    beforeAll(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                WaitlistsService,
                Waitlist,
                {
                    provide: WaitlistsService,
                    useValue: waitlistService
                },
            ]
        }).compile()
        mockWaitlistService = module.get<WaitlistsService>(WaitlistsService)
    })
    it('should call addToWaitlist method', async() => {
        expect(mockWaitlistService.addToWaitlist(waitlistDto)).toEqual({
            id: 'string-uuid',
            ...waitlistDto,
        })
    })

    it('should fetch all waiters on the waitlist', async() => {
        expect(mockWaitlistService.findAll()).toEqual([{},{}])
    })

    it('should call addToWaitlist method', async() => {
        expect(mockWaitlistService.addToWaitlist(waitlistDto)).toEqual({
            id: 'string-uuid',
            ...waitlistDto,
        })
    })

    it('should fetch all waiters on the waitlist', async() => {
        expect(mockWaitlistService.findAll()).toEqual([{},{}])
    })

})