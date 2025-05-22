import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    try {
        const logger = new Logger('MainApp', { timestamp: true });

        const app = await NestFactory.create(AppModule, {
            logger: new ConsoleLogger({
                prefix: 'Backend-Courses',
            }),
        });

        app.setGlobalPrefix('api');

        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
                transformOptions: {
                    enableImplicitConversion: true,
                },
            }),
        );
        const config = new DocumentBuilder()
            .setTitle('Courses')
            .setVersion('1.0')
            .addSecurity('basic', {
                type: 'http',
                scheme: 'basic',
            })
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: 'JWT',
                    description: 'Enter JWT token',
                    in: 'header',
                },
                'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
            ).build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('swagger', app, document);

        await app.listen(envs.PORT);

        logger.log(`✅ App is listening on port ${envs.PORT}`);
    } catch (err) {
        console.error('❌ Error starting app:', err);
    }
}
bootstrap();
