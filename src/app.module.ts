import { Module } from '@nestjs/common';
import { AuthModule } from './controller/auth/auth.module';
import { ProductModule } from './controller/products/product.module';
import { DatabaseModule } from './common/modules/DatabaseModule';

@Module({
  imports: [DatabaseModule,AuthModule,ProductModule],
})
export class AppModule {}
