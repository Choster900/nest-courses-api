import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginUserDto {

    @ApiProperty({
        example: 'usuario@example.com',
        description: 'Correo electrónico del usuario (opcional)',
    })
    @IsEmail({}, { message: 'El correo no es válido' })
    email: string;

    @ApiProperty({
        example: 'Password123',
        description: 'Contraseña del usuario (requerida)',
    })
    @IsString({ message: 'La contraseña es obligatoria' })
    password: string;
}
