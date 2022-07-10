import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('Gerenciador de Eventos')
		.setVersion('0.1.0')
		.build()

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api-doc', app, document);

	app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
