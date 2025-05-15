import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class RegisterUserDto {

    @ApiProperty({
        example: 'Juan Pérez',
        description: 'Nombre completo del usuario',
        maxLength: 100,
    })
    @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
    @IsString({ message: 'El nombre completo debe ser texto' })
    @MaxLength(100, { message: 'El nombre completo no debe exceder los 100 caracteres' })
    @Transform(({ value }) => value?.trim())
    fullName: string;

    @ApiProperty({
        example: 'juan@example.com',
        description: 'Correo electrónico del usuario',
    })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    email: string;

    @ApiProperty({
        example: 'Contraseña123',
        description: 'Contraseña del usuario. Debe contener al menos una letra y un número, y tener entre 8 y 30 caracteres.',
        minLength: 8,
        maxLength: 30,
    })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(30, { message: 'La contraseña no debe exceder los 30 caracteres' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'La contraseña debe contener al menos una letra y un número',
    })
    password: string;

    @ApiProperty({
        example: 'USER',
        description: 'Rol del usuario. Puede ser USER o ADMIN',
        enum: Role,
        default: Role.USER,
    })
    @IsEnum(Role, { message: 'El rol debe ser USER o ADMIN' })
    @Transform(({ value }) => value?.toUpperCase().trim())
    role: Role = Role.USER;
}
