import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI});

  const config = new DocumentBuilder()
    .setTitle('Desafio Keycash')
    .setDescription('Documentação da API para o desafio Keycash.')
    .setVersion('1.0')
    .addTag('Autenticação', 'Autenticação de usuários e administradores.')
    .addTag('Imóveis', 'CRUD de Imóveis')
    .addTag('Usuários', 'CRUD de Usuários')
    .addTag('Localidades', 'Assumindo que as localidades( cidades, estados e países) serão inseridas no banco de dados através de um seed, há apenas métodos de consulta.')
    .addTag('Categorias de imóveis', 'Assumindo que as categorias serão inseridas no banco de dados através de um seed, há apenas métodos de consulta.')
    .addTag('Administradores', 'CRUD de Admins. Apenas usuários administradores podem operar nesses endpoints')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
