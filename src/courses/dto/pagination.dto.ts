// src/common/dto/pagination.dto.ts
import { IsOptional, IsPositive, IsString, IsEnum } from 'class-validator';
import { Category } from '@prisma/client';

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    page?: number;

    @IsOptional()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsEnum(Category, { message: 'Categoría no válida' })
    category?: Category;
}
