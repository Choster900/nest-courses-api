import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from './dto';
import { Category } from './dto/create-course.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo curso' })
    @ApiResponse({ status: 201, description: 'Curso creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los cursos (con paginación y filtros)' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'title', required: false, type: String, example: 'JavaScript' })
    @ApiQuery({ name: 'category', required: false, enum: Category, example: Category.COOKING })
    @ApiResponse({ status: 200, description: 'Lista de cursos' })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.coursesService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un curso por ID' })
    @ApiParam({ name: 'id', description: 'UUID del curso', example: 'b14c1e13-d9cd-4d71-8bd9-739e59e19813' })
    @ApiResponse({ status: 200, description: 'Curso encontrado' })
    @ApiResponse({ status: 404, description: 'Curso no encontrado' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.coursesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un curso por ID' })
    @ApiParam({ name: 'id', description: 'UUID del curso', example: 'b14c1e13-d9cd-4d71-8bd9-739e59e19813' })
    @ApiResponse({ status: 200, description: 'Curso actualizado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 404, description: 'Curso no encontrado' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un curso por ID' })
    @ApiParam({ name: 'id', description: 'UUID del curso', example: 'b14c1e13-d9cd-4d71-8bd9-739e59e19813' })
    @ApiResponse({ status: 200, description: 'Curso eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Curso no encontrado' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.coursesService.remove(id);
    }
}
