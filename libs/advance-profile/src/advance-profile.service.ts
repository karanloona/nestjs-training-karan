import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileModel } from './profile.model';

@Injectable()
export class AdvanceProfileService {
    private logger:Logger=new Logger();
    constructor(
        @InjectModel(ProfileModel)
        private profileModel:typeof ProfileModel,
    ){}

    async getProfileByUserId(userId:number){
        try{
            const user = await this.profileModel.findOne({
                where: { userId: userId },
            });
            if(!user){
                throw new Error(`Profile Details not found`)
            }
            return user;
            
        } catch (error) {
            this.logger.error(error.message);
            throw new BadRequestException(error.message);
        }

    }
}
