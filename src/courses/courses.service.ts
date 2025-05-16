
import { Prisma, PrismaClient } from '@prisma/client';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCourseDto, PaginationDto, UpdateCourseDto } from './dto';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

@Injectable()
export class CoursesService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect();
    }

    async create(createCourseDto: CreateCourseDto) {
        try {
            const { title } = createCourseDto;

            const existingCourse = await this.course.findFirst({
                where: {
                    title,
                    published: true,
                },
            });

            if (existingCourse) {
                return buildErrorResponse('El curso agregado ya existe');
            }

            const course = await this.course.create({
                data: createCourseDto,
            });

            return buildSuccessResponse(course, "Curso creado con éxito");

        } catch (error) {
            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }
    }

    async findAll(paginationDto: PaginationDto) {
        try {
            const { page = 1, limit = 10, title, category } = paginationDto;

            const whereConditions: Prisma.CourseWhereInput = {
                published: true,
            };

            if (title) {
                whereConditions.title = { contains: title };
            }

            if (category) {
                whereConditions.category = category;
            }

            const allFilteredCourses = await this.course.findMany({
                where: whereConditions,
                orderBy: { createdAt: 'desc' },
            });

            const totalCourses = allFilteredCourses.length;
            const lastPage = Math.ceil(totalCourses / limit);

            const paginatedCourses = allFilteredCourses.slice(
                (page - 1) * limit,
                page * limit,
            );

            const result = {
                items: paginatedCourses,
                meta: {
                    page,
                    total: totalCourses,
                    lastPage,
                },
            };

            return buildSuccessResponse(result, 'Cursos obtenidos con éxito');
        } catch (error) {
            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status,
            );
        }
    }

    public async getCourseById(id: string, onlyPublished = true) {
        return this.course.findUnique({
            where: { id },
            ...(onlyPublished && { where: { id, published: true } }),
        });
    }

    async findOne(id: string) {
        try {
            const course = await this.getCourseById(id);
            if (!course) {
                return buildErrorResponse('El curso no existe o está despublicado', 400);
            }

            return buildSuccessResponse(course, 'Curso encontrado');
        } catch (error) {
            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status,
            );
        }
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        try {
            const course = await this.getCourseById(id);
            if (!course) {
                return buildErrorResponse('El curso no existe o está despublicado', 400);
            }

            const updatedCourse = await this.course.update({
                where: { id },
                data: updateCourseDto,
            });

            return buildSuccessResponse(updatedCourse, 'Curso actualizado con éxito');
        } catch (error) {
            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status,
            );
        }
    }

    async remove(id: string) {
        try {
            const course = await this.getCourseById(id);
            if (!course) {
                return buildErrorResponse('El curso no existe o ya fue despublicado', 400);
            }

            const unpublishedCourse = await this.course.update({
                where: { id },
                data: { published: false },
            });

            return buildSuccessResponse(unpublishedCourse, 'Curso despublicado con éxito');
        } catch (error) {
            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status,
            );
        }
    }
}
