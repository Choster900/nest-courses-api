import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {

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

    await app.listen(envs.PORT);

    logger.log(`App is listening on port ${envs.PORT}`);
}
bootstrap();
