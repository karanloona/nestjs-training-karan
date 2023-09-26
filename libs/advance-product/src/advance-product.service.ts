import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './product.model';
import { ImagesModel } from './images.model';
import { Product, ProductsResponseDTO } from 'src/controller/products/product.controller.dto';

@Injectable()
export class AdvanceProductService {
    private logger:Logger=new Logger();
    constructor(
        @InjectModel(ProductModel)
        private productModel:typeof ProductModel,
        @InjectModel(ImagesModel)
        private imagesModel:typeof ImagesModel
    ){}

    async addProduct(request:Product):Promise<Product>{
        try{
            const res = await ProductModel.create({
                title: request.title ? request.title : '',
                description: request.description ? request.description : '',
                price: request.price ? request.price : '',
                discountPercentage: request.discountPercentage ? request.discountPercentage : '',
                rating: request.rating ? request.rating : '',
                stock: request.stock ? request.stock : '',
                brand: request.brand ? request.brand : '',
                category: request.category ? request.category : '',
                thumbnail: request.thumbnail ? request.thumbnail : '',
            });

            if(request.images){
                const query=request.images.map((image)=>{
                    return {productId:res.id, url: image}
                })
                ImagesModel.bulkCreate(query);
            }
            const images = request.images
            const finalResult = {res, images};
            return finalResult;
        } catch (error) {
            this.logger.error(error.message);
            throw new BadRequestException(error.message);
        }
    }

    async getProductById(id:number):Promise<Product>{
        try{
            const product:ProductModel = await this.productModel.findOne({
                where: { id: id },
            });
            
            const images = await this.imagesModel.findAll({ where: {
                productId: id
            }})
            const imagesRes:Array<string> = images.map((image)=>{
                return image.url;
            })
            const finalRes = {product, images: imagesRes};
            return finalRes;
        } catch (error) {
            this.logger.error(error.message);
            throw new BadRequestException(error.message);
        }
    }

    async deleteProductById(id:number):Promise<number>{
        try{
            await ProductModel.destroy({ where: { id: id } });
            await ImagesModel.destroy({ where: { productId: id } });
            return id;
        } catch (error) {
            this.logger.error(error.message);
            throw new BadRequestException(error.message);
        }
    }

    async getAllProducts(skip:any, limit:any):Promise<ProductsResponseDTO> {
        try {
            const products:ProductModel[] = await ProductModel.findAll({
                attributes: ['id', 'title', 'description', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'category', 'thumbnail'],
                include: [{
                    model: ImagesModel,
                    as: 'images',
                    attributes: ['url'],
                }],
                offset: parseInt(skip),
                limit: parseInt(limit),
                order: [['id', 'ASC']],
            });
            const count = await ProductModel.count();
           return {products, total: count, skip: parseInt(skip), limit: parseInt(limit)}
        } catch (error) {
            this.logger.error(error.message);
            throw new BadRequestException(error.message);
        }
    } 

    async updateProduct(id:number, product:Product):Promise<Product>{
        try{
            await ProductModel.update(product, {
                where: { id },
            });

            if (product.images) {
                await ImagesModel.destroy({
                  where: {
                    productId: id,
                  },
                });
          
                const query = product.images.map((image) => {
                  return { productId: id, url: image };
                });
          
                await ImagesModel.bulkCreate(query);
              }

            return product;
          

        } catch (error) {
            this.logger.error(error.message);
            throw new BadRequestException(error.message);
        }
    }


}
