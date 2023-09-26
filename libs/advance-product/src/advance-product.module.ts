import { Module } from '@nestjs/common';
import { AdvanceProductService } from './advance-product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './product.model';
import { ImagesModel } from './images.model';

@Module({
  imports:[SequelizeModule.forFeature([ProductModel,ImagesModel])],
  providers: [AdvanceProductService],
  exports: [AdvanceProductService, SequelizeModule],
})
export class AdvanceProductModule {}
