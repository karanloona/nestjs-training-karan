import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGaurd } from "../auth/auth.gaurd";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { API_BEARER_AUTH_NAME } from "src/constants/common.constants";
import { Product } from "./product.controller.dto";

@ApiTags('product')
@Controller('product')
export class ProductController{
    constructor(private readonly productService:ProductService){}
    
    @UseGuards(AuthGaurd)
    @ApiBearerAuth(API_BEARER_AUTH_NAME)
    @Get('getProducts')
    async getProducts(@Query('skip') skip: number, @Query('limit') limit: number){
        if(!skip){
            skip=0;
        }
        if(!limit){
            limit=20;
        }
        return await this.productService.getProducts(skip, limit);
    }

    @UseGuards(AuthGaurd)
    @ApiBearerAuth(API_BEARER_AUTH_NAME)
    @Get(':id')
    async getProductById(@Param('id') id:number) {
        return await this.productService.getProductById(id);
    }

    @UseGuards(AuthGaurd)
    @ApiBearerAuth(API_BEARER_AUTH_NAME)
    @Post('add')
    async addProduct(@Body()request:Product) {
        return await this.productService.addProduct(request);
    }


    @UseGuards(AuthGaurd)
    @ApiBearerAuth(API_BEARER_AUTH_NAME)
    @Patch(':id')
    async updateProduct(@Param('id') id: number, @Body()request:Product) {
        return await this.productService.updateProduct(id,request);
    }

    @UseGuards(AuthGaurd)
    @ApiBearerAuth(API_BEARER_AUTH_NAME)
    @Delete(':id')
    async deleteProduct(@Param('id')id:number) {
        return await this.productService.deleteProduct(id);
    }

}