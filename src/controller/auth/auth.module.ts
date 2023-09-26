import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { HttpModule } from "@nestjs/axios";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JWT_CONSTANT } from "src/constants/common.constants";
import { AUTH_JWT_SERVICE } from "./auth.gaurd";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdvanceAuthModule } from "@app/advance-auth";
import { AdvanceProfileModule } from "@app/advance-profile";

@Module({
    imports:[
        AdvanceAuthModule,
        AdvanceProfileModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        JwtModule.register({
            global: true,
            secret: JWT_CONSTANT,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers:[
        AuthService,
        {
            provide: AUTH_JWT_SERVICE,
            useExisting: JwtService,
        },
    ],
    controllers:[AuthController],
    exports: [AUTH_JWT_SERVICE],
})
export class AuthModule{}