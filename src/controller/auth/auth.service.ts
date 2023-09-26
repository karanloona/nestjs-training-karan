import { Injectable, Logger } from "@nestjs/common";
import { LoginRequestDTO, LoginResponseDTO } from "./auth.controller.dto";
import { AdvanceAuthService } from "@app/advance-auth";
import { AdvanceProfileService } from "@app/advance-profile";
import { JwtService } from "@nestjs/jwt";
import { ProfileModel } from "@app/advance-profile/profile.model";


@Injectable()
export class AuthService {
    private logger:Logger=new Logger();
    constructor(
        private readonly authService: AdvanceAuthService,
        private readonly profileService: AdvanceProfileService,
        private readonly jwtService: JwtService
        
    ) {}
    async login(request:LoginRequestDTO):Promise<LoginResponseDTO>{
        this.logger.log(`Going to auth library`);
        const result = await this.authService.login(request);
        
        if(!result){
            throw new Error(`Wrong Credentials`)
        }
        
        this.logger.log(`Going to profile library`);
        const user:ProfileModel = await this.profileService.getProfileByUserId(result.id);

        const tokenPayload = {
            id: user.userId,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            image: user.image
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            access_token: accessToken,
        };
        
    }
}