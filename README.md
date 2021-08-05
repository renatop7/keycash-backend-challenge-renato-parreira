# Desafio Keycash

O desafio consistia em construir uma API REST para CRUD de imóveis para venda.

---

## Stack utilizado

- Node.js@LTS
- npm@7.\*
- NestJS@8.\* + Express
- Sequelize@6.\*
- MySQL@8.\*
- Swagger-Express@4.\*
- Passport@0.4.*
- Typescript@4.\*

### Por que o framework NestJS?

O NestJS é um framework de backend feito em typescript, utiliza o Express.js por debaixo dos panos e possui suporte para diversos ORMs como o Sequelize.  
Assim se torna uma combinação interessante para desenvolvimento da aplicação, mantendo o acesso a toda a API do Express e utlizando as vantagens de se programar em Typescript.

---

## Setup

Após clonar este repositório, execute `npm install`

### Database, Migrations e Seeds

Configure as informações de acesso ao banco de dados nos arquivos `sequelize/config/config.json` e `env.ts`

Com os dados configurados, execute `npm run setup:db`

Este comando irá criar o `schema`, executar as `migrations` e `seeders` encontradas em `./sequelize/*`, criando as tabelas e alguns dados iniciais.

### Server

Para iniciar a aplicação execute `npm start`  
Ela se iniciará no endereço `http://localhost:3000/`

---

## Sobre a API e técnicas utilizadas

## Documentação (Swagger)

A documentação da API é acessível através do endereço: `http://localhost:3000/api`  
Foi utilizado a biblioteca `swagger-ui-express` para gerar a documentação  
Todo o schema da documentação é feito através de `@Decorators` encontrados nos arquivos `*.controller.ts` e `*.dto.ts`

## Versionamento

A API já possui um versionamento, assim todas as requisições precisam ter o prefixo `http://localhost:3000/api/v1`  
Exemplo:

`GET http://localhost:3000/api/v1/properties`

## Authentication e Authorization

Para fazer a autenticação das requisições na API utilizo JWT em conjunto com o AuthMiddleware `passport.js`  
Assim nas rotas que são protegidas, é necessário ter o `AuthorizationHeader` setado com o `Bearer {token}`  
Algumas rotas possuem uma camada extra de segurança e só são acessíveis com um token de administrador.

## Validação

Os dados enviados à aplicação são validados através de um `ValidationPipe`.  
O `ValidationPipe` utiliza as instruções de validação de um determinado modelo encontradas no `*.dto.ts` da requisição sendo executada.

Exemplo, ao inserir um novo imóvel:

```typescript
/* ./src/properties/dto/create-property.dto.ts */

export class CreatePropertyDto {
  @IsString() // Valida se é uma string
  @IsNotEmpty() // Valida se não está vazio
  @ApiProperty()
  title: string;

  @IsString() // Valida se é uma string
  @IsNotEmpty() // Valida se não está vazio
  @ApiProperty()
  description: string;

  //...
}
```

## Property Data Model

Modelo completo de um imóvel (Property) cadastrado na aplicação

```typescript
interface Property {
  title: string; // Título do imóvel

  description: string; // Descrição

  area: number; // Metragem

  price: number; // Preço do omóvel

  rooms: number; // número de comodos

  category: Category; // Categoria do imóvel

  parkingSpaces: number; // Vagas de garagem

  bathrooms: number; // Numero de banheiros

  propertyTaxPrice: number; // IPTU

  condoPrice: number; // Preço condomínio

  owner: User; // Usuário proprietário do imóvel

  address: Address; // Endereço do imóvel
}
```

Exemplo JSON de resposta:

`GET http://localhost:3000/api/v1/properties/1`

```json
{
  "id": 1,
  "title": "Imóvel 1",
  "description": "Descrição do imóvel 1",
  "rooms": 1,
  "area": 20,
  "categoryId": 1,
  "parkingSpaces": 1,
  "bathrooms": 1,
  "price": "20000.00",
  "propertyTaxPrice": "10.00",
  "condoPrice": "100.00",
  "ownerId": 1,
  "createdAt": "2021-08-04T20:43:13.000Z",
  "updatedAt": "2021-08-04T20:43:13.000Z",
  "category": {
    "id": 1,
    "name": "Apartamento",
    "typeId": 1,
    "type": {
      "id": 1,
      "name": "Residencial"
    }
  },
  "owner": {
    "id": 1,
    "name": "Usuário 1",
    "email": "usuario1@keycash.com"
  },
  "address": {
    "id": 1,
    "street": "Rua Belo Horizonte",
    "number": 1,
    "complement": "apto 1",
    "district": "Bairro",
    "cityId": 1,
    "stateId": 1,
    "countryId": 1,
    "zipCode": 88088000,
    "propertyId": 1,
    "createdAt": "2021-08-04T20:43:13.000Z",
    "updatedAt": "2021-08-04T20:43:13.000Z",
    "city": {
      "id": 1,
      "name": "Belo Horizonte"
    },
    "state": {
      "id": 1,
      "name": "Minas Gerais",
      "uf": "MG"
    },
    "country": {
      "id": 1,
      "name": "Brasil"
    }
  }
}
```

## Filtro de imóveis

Os filtros para consulta de imóveis são aplicados através de `query parameters`.

Por exemplo:  
`GET http://localhost:3000/api/v1/properties?rooms=4&area=20,40`

A aplicação irá apresentar uma lista de imóveis que possua:

- `rooms=4` 4 quartos e
- `area=20,40` uma área entre 20m² e 40m²

A lista completa de parâmetros disponíveis está presente na documentação da API.

O código para os filtros está presente no arquivo `./src/properties/properties.service.ts`

---

## Testing

Com o intuito de simplificar a demonstração neste desafio, eu fiz o unit test apenas do `PropertiesService` utilizando a biblioteca `jest`

Execute o comando `npm run setup:db:test` para realizar as `migrations` e `seeders` e criar o `schema` de teste

Após tudo configurado execute o comando `npm run test`

O arquivo de teste se encontra em `src/properties/properties.service.spec.ts`
