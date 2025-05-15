import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString, IsEnum } from 'class-validator';
import { Category } from './create-course.dto'; // o de donde esté tu enum

export class PaginationDto {
    @ApiPropertyOptional({ example: 1, description: 'Número de página' })
    @IsOptional()
    @IsPositive()
    page?: number;

    @ApiPropertyOptional({ example: 10, description: 'Cantidad de elementos por página' })
    @IsOptional()
    @IsPositive()
    limit?: number;

    @ApiPropertyOptional({ example: 'JavaScript', description: 'Filtra cursos por título' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ enum: Category, example: Category.FINANCE, description: 'Filtra cursos por categoría' })
    @IsOptional()
    @IsEnum(Category, { message: 'Categoría no válida' })
    category?: Category;
}
