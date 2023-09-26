import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginRequestDTO, LoginResponseDTO } from "./auth.controller.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private logger:Logger=new Logger()
    constructor(private readonly authService:AuthService) {}


    @ApiOperation({ operationId: 'login' })
    @ApiOkResponse({ type: LoginResponseDTO })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() request:LoginRequestDTO):Promise<LoginResponseDTO> {
        this.logger.log(`User trying to login`);
        return await this.authService.login(request);
        
    }
}