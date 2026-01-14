import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Diary API')
  .setDescription('The DIARY REST API documentation')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

export default swaggerConfig;
