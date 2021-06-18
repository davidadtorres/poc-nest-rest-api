import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          ignoreTLS: process.env.MAIL_IGN_TLS.toLowerCase() === 'true',
          secure: process.env.MAIL_SECURE.toLowerCase() === 'true',
          auth: {
            user: process.env.MAIL_INCOMING_USER,
            pass: process.env.MAIL_INCOMING_PASS,
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
      }),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
    }),
    AuthModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
