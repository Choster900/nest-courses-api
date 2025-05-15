import { PrismaClient, Category } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding data...');

    // Crear usuario admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: await bcrypt.hash('hashed-password-admin', 10),
            fullName: 'Admin User',
            role: 'ADMIN',
        },
    });

    await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            password: await bcrypt.hash('hashed-password-user', 10),
            fullName: 'Regular User',
            role: 'USER',
        },
    });

    const courses = [
        {
            title: 'Curso de Cocina Italiana',
            description: 'Aprende a preparar pastas, pizzas y más.',
            category: Category.COOKING,
            price: 49.99,
            published: true,
        },
        {
            title: 'Finanzas Personales 101',
            description: 'Gestiona tu dinero de forma inteligente.',
            category: Category.FINANCE,
            price: 39.99,
            published: true,
        },
        {
            title: 'Inglés para Principiantes',
            description: 'Curso básico de inglés con enfoque conversacional.',
            category: Category.LANGUAGES,
            price: 29.99,
            published: false,
        },
    ];

    for (const course of courses) {
        await prisma.course.create({
            data: {
                ...course,
                instructorId: admin.id,
            },
        });
    }

    console.log('✅ Seed completo');
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seed:', e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
