import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Product, ProductsResponseDTO } from "./product.controller.dto";
import { AdvanceProductService } from "@app/advance-product";

@Injectable()
export class ProductService {
    private logger:Logger=new Logger();
    constructor(private readonly productService:AdvanceProductService) {}
    async getProducts(page: number, limit: number):Promise<ProductsResponseDTO>{
        try{
            this.logger.log("Fetching Products")
            return await this.productService.getAllProducts(page, limit);
        }catch (error) {
            this.logger.log(error.response.data);
            throw new BadRequestException(error, error.response.data.message);
        }
    }

    async getProductById(id:number):Promise<Product>{
        try{
            this.logger.log("Fetching Product by Id")
            return await this.productService.getProductById(id);
        }catch (error) {
            this.logger.log(error.response.data);
            throw new BadRequestException(error, error.response.data.message);
        }
    }

    async addProduct(request:Product):Promise<Product>{
        try{
            this.logger.log("Adding New Product")
            return await this.productService.addProduct(request);
        }catch (error) {
            this.logger.log(error.response.data);
            throw new BadRequestException(error, error.response.data.message);
        }
    }



    async updateProduct(id:number,request:Product):Promise<Product>{
        try{
            this.logger.log("Updating Product");
            return this.productService.updateProduct(id, request)
            
        }catch (error) {
            this.logger.log(error.response.data);
            throw new BadRequestException(error, error.response.data.message);
        }
    }

    async deleteProduct(id:number):Promise<number>{
        try{
            this.logger.log("Deleting Product")
            return this.productService.deleteProductById(id);
        }catch (error) {
            this.logger.log(error.response.data);
            throw new BadRequestException(error, error.response.data.message);
        }
    }

}