import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class AdminGuard implements CanActivate {


    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        console.log(request);
        
        const user = request.user;
        console.log(user);
        
        return user?.role === 'ADMIN'
        
    }
}