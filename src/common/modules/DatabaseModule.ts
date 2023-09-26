import { AuthModel } from "@app/advance-auth/auth.model";
import { ImagesModel } from "@app/advance-product/images.model";
import { ProductModel } from "@app/advance-product/product.model";
import { ProfileModel } from "@app/advance-profile/profile.model";
import { Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";


@Module({
    imports:[
        ConfigModule.forRoot({
            // envFilePath: `${process.env.CONFIG_DIR.trim()}/${process.env.ENVIRONMENT.trim()}.env`
            envFilePath: `config/local.env`
        }),
        SequelizeModule.forRootAsync({
            imports:[ConfigModule],
            useFactory: async (configService:ConfigService)=>({
                dialect: 'mysql',
                host: configService.get<string>('MYSQL_HOST'),
                port: configService.get<number>('MYSQL_PORT'),
                username: configService.get<string>('MYSQL_USERNAME'),
                password: configService.get<string>('MYSQL_PASSWORD'),
                database: configService.get<string>('MYSQL_DB_NAME'),
                models: [AuthModel, ProfileModel, ProductModel, ImagesModel],
                synchronize: configService.get<boolean>('MYSQL_SYNCHRONIZE'),

            }),
            inject: [ConfigService],
        })
    ]
})
export class DatabaseModule {}