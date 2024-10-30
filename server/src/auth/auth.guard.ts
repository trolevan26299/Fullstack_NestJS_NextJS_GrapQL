import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}

 async canActivate(context: ExecutionContext):  Promise<boolean> {
     const ctx = GqlExecutionContext.create(context);
     const token = this.extractTokenFromHeader(ctx.getContext().req);
     if(!token){
        throw new UnauthorizedException();
     }
     try{
        const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
        return true;
    }catch(err){
        throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
     }
 }

 private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
 }
}
