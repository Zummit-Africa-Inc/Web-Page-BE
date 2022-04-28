import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternshipCategoryModule } from './intershipCategories/internshipCategory.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { configConstant } from './common/constants/config.constant';
import { DemoSectionModule } from './demo-section/demo-section.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    DemoSectionModule,
    WaitlistModule,
    InternshipCategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(configConstant.database.host),
        port: configService.get(configConstant.database.port),
        username: configService.get(configConstant.database.username),
        password: configService
          .get<string>(configConstant.database.password)
          ?.toString(),
        database: configService.get(configConstant.database.name),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
