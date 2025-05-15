import { Reflector } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { ROLES_KEY } from 'src/common/decorators';
import { buildErrorResponse } from 'src/common/helpers';

const prisma = new PrismaClient();

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        const userProfiles = await prisma.user.findFirstOrThrow({
            where: { id: user.id },
            select: { role: true },
        });

        const hasRole = requiredRoles.includes(userProfiles.role);

        if (!hasRole) {
            throw new UnauthorizedException(
                buildErrorResponse(
                    'No tiene los perfiles necesarios',
                    403,
                    `Se requieren uno de los siguientes roles: [${requiredRoles.join(', ')}]`,
                )
            );
        }

        return true;
    }
}
