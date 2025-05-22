import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';

@Module({
    imports: [CoursesModule, AuthModule],
    controllers: [HealthController],
    providers: [],
})
export class AppModule { }
