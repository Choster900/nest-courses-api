import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { PrismaClient } from '@prisma/client';

describe('CoursesService', () => {
    let service: CoursesService;
    const mockPrisma = {
        course: {
            findUnique: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoursesService,
                { provide: PrismaClient, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<CoursesService>(CoursesService);
    });

    it('should return course if found', async () => {
        const mockCourse = { id: '123', title: 'Test Course' };
        mockPrisma.course.findUnique.mockResolvedValue(mockCourse);

        const result = await service.findOne('123');
        expect(result).toEqual(mockCourse);
    });

    it('should throw NotFoundException if not found', async () => {
        mockPrisma.course.findUnique.mockResolvedValue(null);

        await expect(service.findOne('123')).rejects.toThrow('Curso no encontrado');
    });
});
