import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterRepository } from 'src/database/repository/register.repository';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [TypeOrmModule.forFeature([RegisterRepository])],
  exports: [RegisterService],
})
export class RegisterModule {}
