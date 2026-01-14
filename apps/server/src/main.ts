import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
// import cookieParser from 'cookie-parser';
import helmet from 'helmet';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { SupabaseAuthGuard } from './auth/guards/jwt-auth.guard.js';
import swaggerConfig from './configs/swagger.config.js';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('Bootstrap');
const production = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

// App server config
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // public dir config, make public readable
  // const __filename = fileURLToPath(import.meta.url); //
  // const __dirname = dirname(__filename);
  // app.useStaticAssets(join(__dirname, '..', 'public'));

  // jwt guards | global guard by default
  app.useGlobalGuards(
    new SupabaseAuthGuard(app.get(Reflector), app.get(ConfigService)),
  );

  // for cookie
  // app.use(cookieParser());

  // ValidationPipe for DTO and class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Manala champs tsy ao @ DTO
      forbidNonWhitelisted: true, // return error if whitelisted
      transform: true, // avadika ho type mety instaed
    }),
  );

  app.use(helmet()); // Helmet middleware for security headers
  app.use(compression());
  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
      { path: 'webhooks/stripe', method: RequestMethod.POST },
    ],
  }); // Set global API prefix, exclude *root'/' *health, ...

  // Swagger documentation setup
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Enable CORS with credentials
  app.enableCors({
    origin: [
      production ? 'https://memoroom.vercel.app' : 'http://127.0.0.1:5173',
    ],
    credentials: true,
  });

  // listen a port
  await app.listen(port, '0.0.0.0');
  logger.log(
    production
      ? '🚀 Application is running on: https://memoroom-api.onrender.com ❇️.'
      : `🚀 Application is running on: http://localhost:${port}`,
  );
  console.log('✔ MODE:', process.env.NODE_ENV, '🪄  ✅');
}

// catch this error, and kill process
bootstrap().catch((err: unknown) => {
  logger.error('❌ Failed to start application:', err);
  process.exit(1);
});
