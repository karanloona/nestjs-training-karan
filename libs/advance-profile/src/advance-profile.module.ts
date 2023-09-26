import { Module } from '@nestjs/common';
import { AdvanceProfileService } from './advance-profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileModel } from './profile.model';

@Module({
  imports:[SequelizeModule.forFeature([ProfileModel])],
  providers: [AdvanceProfileService],
  exports: [AdvanceProfileService,SequelizeModule],
})
export class AdvanceProfileModule {}
