import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { configConstant } from 'src/common/constants/config.constant';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get(configConstant.mail.mail_host),
          secure: false,
          service: 'Gmail',
          auth: {
            user: config.get(configConstant.mail.mail_user),
            pass: config.get(configConstant.mail.mail_password),
          },
        },
        defaults: {
          from: config.get(configConstant.mail.mail_from),
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
