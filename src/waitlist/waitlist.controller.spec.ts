import { Test, TestingModule } from '@nestjs/testing';
import { WaitlistController } from './waitlist.controllers';
import { WaitlistDto } from './dto/waitlist.dto'
import { Waitlist } from '../entities/waitlist.entity'


describe('WaitlistController', () => {
  let mockWaitlistController : WaitlistController
  let waitlistDto = new WaitlistDto()
  waitlistDto.category = 'WEB DEVELOPMENT'
  waitlistDto.email = 'batman@gmail.com'

  const waitlistController = {
    joinWaitlist: jest.fn((body) => {
        return {
            id: 'string-uuid',
            ...body,
        }
    }),
    showWaitlist: jest.fn(() => {
        return [{}, {}]
    })

}

  beforeEach(async () => {
    const module: TestingModule =await Test.createTestingModule({
      providers: [
        WaitlistController,
        Waitlist,
         {
        provide: WaitlistController,
        useValue: waitlistController
      }]
    }).compile()

    mockWaitlistController =module.get<WaitlistController>(WaitlistController)
  })
  
  it('should be defined', () => {
    expect(mockWaitlistController).toBeDefined()
  })
  
  it('should add a new member of the waitlist', () => {
    expect(mockWaitlistController.joinWaitlist(waitlistDto)).toEqual({
      id: 'string-uuid',
      ...waitlistDto
    })
  })

  it('should display all members of the waitlist', () => {
    expect(mockWaitlistController.showWaitlist()).toEqual(
      [{},{}]
    )
  })

});

