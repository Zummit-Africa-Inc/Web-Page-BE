import { Module } from "@nestjs/common";
import { WaitlistsService } from "./waitlist.service";
import { Waitlist } from "./waitlist.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
imports: [TypeOrmModule.forFeature([Waitlist])],
providers: [WaitlistsService],
exports: [WaitlistsService, TypeOrmModule],
controllers: []
})

export class WaitlistModule{}