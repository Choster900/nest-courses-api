import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth('JWT-auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    create(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }

    @Post('login')
    loginByEmail(@Body() loginByEmailDto: LoginUserDto) {
        return this.authService.loginUser(loginByEmailDto);
    }

    @Get('private-route')
    @Roles('USER')
    @UseGuards(JwtAuthGuard, RolesGuard)
    privateRoute() {
        return {
            ok: true,
            message: "estas dentro de la ruta"
        }
    }
}
