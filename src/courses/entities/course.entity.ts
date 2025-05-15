export class Course {
    id: string;
    title: string;
    description: string;
    category: 'COOKING' | 'FINANCE' | 'LANGUAGES';
    price: number;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    instructorId: string;
}
