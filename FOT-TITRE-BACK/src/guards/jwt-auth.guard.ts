import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
      }
    
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        if (err || !user) {
        throw err || new UnauthorizedException();
        }

        const request = context.switchToHttp().getRequest();
        const { userId: paramUserId } = request.params;

        if (user.userId !== +paramUserId) {
        throw new UnauthorizedException('User ID in JWT does not match the request.');
        }

        return user;
    }
}
