import { Module } from '@nestjs/common';
import { AdvanceAuthService } from './advance-auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from './auth.model';

@Module({
  imports:[SequelizeModule.forFeature([AuthModel])],
  providers: [AdvanceAuthService],
  exports: [AdvanceAuthService, SequelizeModule],
})
export class AdvanceAuthModule {}
