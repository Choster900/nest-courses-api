import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

    constructor(
        private readonly jwtService: JwtService
    ) {
        super();
    }

    onModuleInit() {
        this.$connect();
    }

    async registerUser(registerUserDto: RegisterUserDto) {
        const {
            fullName,
            email,
            password,
            role
        } = registerUserDto;

        try {
            if (email) {
                const existingUser = await this.user.findUnique({
                    where: { email },
                });

                if (existingUser) {
                    return buildErrorResponse('El correo del usuario ya está registrado', 500);
                }
            }

            const newUser = await this.user.create({
                data: {
                    fullName,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    role,
                },

            });

            const { password: __, ...rest } = newUser

            const jwtPayload = {
                userId: newUser.id,
            };

            return buildSuccessResponse({
                user: rest,
                token: this.getJwtToken(jwtPayload),
            });
        } catch (error) {

            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }
    }


    async loginUser(loginByEmailDto: LoginUserDto) {
        const { password, email } = loginByEmailDto;

        try {

            const user = await this.user.findFirst({
                where: { email },
            });

            if (!user) {
                return buildErrorResponse('Credenciales incorrectas', 400);
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                throw new Error('La contraseña es incorrecta');
            }

            const { password: __, ...userWithoutPassword } = user;

            const jwtPayload = {
                userId: user.id,
            };

            return {
                user: userWithoutPassword,
                token: this.getJwtToken(jwtPayload),
            };
        } catch (error) {

            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }
    }
    private getJwtToken(payload: JwtPayload) {

        const token = this.jwtService.sign(payload)

        return token

    }
}
