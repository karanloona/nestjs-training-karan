import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { AuthModule } from "../auth/auth.module";
import { HttpModule, HttpService } from "@nestjs/axios";
import { AdvanceProductModule } from "@app/advance-product";
// import { AuthModule } from "../auth/auth.module";

@Module({
    imports:[
        AdvanceProductModule,
        HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
    }),
    AuthModule],
    controllers:[ProductController],
    providers:[ProductService]
})

export class ProductModule {}