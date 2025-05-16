import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    create(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Autenticación de usuario por email' })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    loginByEmail(@Body() loginByEmailDto: LoginUserDto) {
        return this.authService.loginUser(loginByEmailDto);
    }

    @Get('private-route')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Ruta protegida solo accesible para usuarios autenticados con rol USER' })
    @ApiResponse({ status: 200, description: 'Acceso concedido a la ruta privada' })
    @ApiResponse({ status: 403, description: 'Acceso denegado: no autorizado sin el rol adecuado' })
    privateRoute() {
        return {
            ok: true,
            message: "estas dentro de la ruta"
        };
    }
}
