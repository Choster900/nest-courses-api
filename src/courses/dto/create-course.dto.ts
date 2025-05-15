import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEnum, IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export enum Category {
    COOKING = 'COOKING',
    FINANCE = 'FINANCE',
    LANGUAGES = 'LANGUAGES',
}

export class CreateCourseDto {
    @ApiProperty({ example: 'Introduction to Cooking', description: 'Título del curso' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Aprende técnicas básicas de cocina.', description: 'Descripción del curso' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ enum: Category, example: Category.COOKING, description: 'Categoría del curso' })
    @IsEnum(Category)
    category: Category;

    @ApiProperty({ example: 29.99, description: 'Precio del curso' })
    @Type(() => Number)
    @IsNumber()
    price: number;

    @ApiProperty({ example: true, description: 'Indica si el curso está publicado' })
    @Type(() => Boolean)
    @IsBoolean()
    published: boolean;

    @ApiProperty({ example: 'b14c1e13-d9cd-4d71-8bd9-739e59e19813', description: 'UUID del instructor asociado' })
    @IsUUID()
    instructorId: string;
}
