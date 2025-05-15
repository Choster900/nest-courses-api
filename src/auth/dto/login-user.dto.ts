import { IsEmail, IsOptional, IsString } from "class-validator";

export class LoginUserDto {

    @IsEmail({}, { message: 'El correo no es válido' })
    email?: string;

    @IsString({ message: 'La contraseña es obligatoria' })
    password: string;
}
