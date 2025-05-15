import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class RegisterUserDto {

    @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
    @IsString({ message: 'El nombre completo debe ser texto' })
    @MaxLength(100, { message: 'El nombre completo no debe exceder los 100 caracteres' })
    @Transform(({ value }) => value?.trim())
    fullName: string;

    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(30, { message: 'La contraseña no debe exceder los 30 caracteres' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'La contraseña debe contener al menos una letra y un número',
    })
    password: string;

    @IsEnum(Role, { message: 'El rol debe ser USER o ADMIN' })
    @Transform(({ value }) => value?.toUpperCase().trim())
    role: Role = Role.USER;
}
