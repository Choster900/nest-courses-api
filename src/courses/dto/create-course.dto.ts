import { IsString, IsNotEmpty, IsNumber, IsEnum, IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export enum Category {
    COOKING = 'COOKING',
    FINANCE = 'FINANCE',
    LANGUAGES = 'LANGUAGES',
}

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(Category)
    category: Category;

    @Type(() => Number)
    @IsNumber()
    price: number;

    @Type(() => Boolean)
    @IsBoolean()
    published: boolean;

    @IsUUID()
    instructorId: string;
}
