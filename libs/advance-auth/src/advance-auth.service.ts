import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from './auth.model';
import { LoginRequestDTO } from 'src/controller/auth/auth.controller.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdvanceAuthService {
    private logger:Logger=new Logger();
    constructor(
        @InjectModel(AuthModel)
        private authModel:typeof AuthModel,

    ){}

    async login(request:LoginRequestDTO):Promise<any>{
        try {
            // Find the user by their username (assuming username is unique)
            const user = await this.authModel.findOne({
                where: { username: request.userName },
            });
            

            if (!user) {
                throw new BadRequestException('Invalid username');
            }
            

            // Verify the password
            const isPasswordValid = await bcrypt.compare(
                request.password,
                user.password,
            );

            if (!isPasswordValid) {
                throw new BadRequestException('Invalid password');
            }
            return {id: user.id, status: true};
        } catch (error) {
            this.logger.error(error.message);
            throw new BadRequestException(error.message);
        }
    }
}
