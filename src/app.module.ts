import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // load env
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                type: 'postgres',
                host: cfg.get<string>('DB_HOST'),
                port: cfg.get<number>('DB_PORT'),
                username: cfg.get<string>('DB_USERNAME'),
                password: cfg.get<string>('DB_PASSWORD'),
                database: cfg.get<string>('DB_NAME'),
                entities: [User],

                synchronize: true,
                logging: false,
            }),
        }),
    UserModule,
    AuthModule,
    ],
})
export class AppModule {}
