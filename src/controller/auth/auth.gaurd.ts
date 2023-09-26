import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

export const AUTH_JWT_SERVICE = 'AUTH_JWT_SERVICE';

@Injectable()
export class AuthGaurd implements CanActivate{
    constructor(@Inject(AUTH_JWT_SERVICE)private jwtService:JwtService){}
    async canActivate(context:ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            await this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException();
        }

        return true;

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}