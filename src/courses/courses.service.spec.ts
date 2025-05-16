import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { PrismaClient } from '@prisma/client';

export enum Category {
    COOKING = 'COOKING',
    FINANCE = 'FINANCE',
    LANGUAGES = 'LANGUAGES',
}
describe('CoursesService', () => {
    let service: CoursesService;
    const mockPrisma = {
        course: {
            findUnique: jest.fn(),
            create: jest.fn(),

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

        mockPrisma.course.findUnique.mockResolvedValue({
            id: "a4084a25-5d40-4169-a28d-013cbdd82136",
            title: "Corredor de bola",
            description: "Se como el lobo de wall street en 1h",
            category: "FINANCE",
            price: 49.99,
            published: true,
            instructorId: "3dd26ccc-2ef2-4de2-bd83-79adb65dac63"
        });

        const result = await service.findOne('a4084a25-5d40-4169-a28d-013cbdd82136');

        expect(result).toEqual(expect.objectContaining({
            success: true,
            code: 200,
            message: "Curso encontrado",
            data: expect.any(Object),
        }));
    });

    it('should return error object if not found', async () => {
        mockPrisma.course.findUnique.mockResolvedValue(null);

        const result = await service.findOne('1234');
        expect(result).toMatchObject({
            success: false,
            code: 400,
            message: "El curso no existe o está despublicado",
            errorDetails: undefined,
        });
        expect(result.timestamp).toBeDefined();

    });

});
