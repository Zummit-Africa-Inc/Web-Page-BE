import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantsModule } from './applicants/applicant.module';
import { InternshipCategoryModule } from './intershipCategories/internshipCategory.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { configConstant } from './common/constants/config.constant';
import { InternshipCategoryContoller } from './intershipCategories/internshipCategories.controllers';
import { WaitlistController } from './waitlist/waitlist.controllers';

// @Module({
//   imports: [
//     ApplicantsModule,
//     WaitlistModule,
//     InternshipCategoryModule,
//     ConfigModule.forRoot({ isGlobal: true }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: "postgres",
//         host: configService.get<string>("POSTGRES_HOST"),
//         port: configService.get<number>("POSTGRES_PORT"),
//         username: configService.get("POSTGRES_USER"),
//         password: configService
//           .get<string>("POSTGRES_PASSWORD")
//           ?.toString(),
//         database: configService.get<string>('POSTGRES_USER'),
//         // entities: [__dirname + "/**/*.entity{.ts,.js}"],
//         autoLoadEntities: true,
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



@Module({
  imports: [
    ApplicantsModule,
    WaitlistModule,
    InternshipCategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get(configConstant.database.host),
        port: configService.get(configConstant.database.port),
        username: configService.get(configConstant.database.username),
        password: configService
          .get<string>(configConstant.database.password)
          ?.toString(),
        database: configService.get(configConstant.database.name),
        // entities: [__dirname + "/**/*.entity{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, InternshipCategoryContoller, WaitlistController],
  providers: [AppService],
})
export class AppModule {}