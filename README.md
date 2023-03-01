# Challenge Keycash

The challenge consisted in building a REST API for CRUD of real estates for sale.

---

## Stack used

- Node.js@LTS
- npm@7.\*
- NestJS@8.\* + Express
- Sequelize@6.\*
- MySQL@8.\*
- Swagger-Express@4.\*
- Passport@0.4.*
- Typescript@4.\*

### Why I used the NestJS framework?

NestJS is a backend framework built in Typescript, uses Express.js under the hood, and has support for various ORMs such as Sequelize.
Thus it becomes an interesting combination for application development, maintaining access to all the Express API and using the advantages of programming in Typescript.

---

## Setup

After cloning this repository, run `npm install`

### Database, Migrations and Seeds

Configure the database access information in the `sequelize/config/config.json` and `env.ts` files.

With the configured data, run `npm run setup:db`

This command will create the `schema`, run the `migrations` and `seeders` found in `./sequelize/*`, creating the tables and some initial data.

### Server

To start the application, run `npm start`  
It will start at `http://localhost:3000/`

---

## About the API and techniques used

## Documentation (Swagger)

The API documentation is accessible through the address: `http://localhost:3000/api`  
The `swagger-ui-express` library was used to generate the documentation
The entire schema of the documentation is done through `@Decorators` found in the `*.controller.ts` and `*.dto.ts` files

## Versioning

The API already has versioning, so all requests must have the prefix `http://localhost:3000/api/v1`  
Example:

`GET http://localhost:3000/api/v1/properties`

## Authentication e Authorization

To authenticate requests to the API, I use JWT in conjunction with the AuthMiddleware `passport.js`  
Thus, in routes that are protected, it is necessary to have the `AuthorizationHeader` set with the `Bearer {token}`  
Some routes have an extra layer of security and are only accessible with an administrator token.

## Data validation

The data sent to the application is validated through a `ValidationPipe`.  
The `ValidationPipe` uses the validation instructions of a certain model found in the request's `*.dto.ts` files

For example, when inserting a new property:

```typescript
/* ./src/properties/dto/create-property.dto.ts */

export class CreatePropertyDto {
  @IsString() // Validates if it is a string
  @IsNotEmpty() // Validates if it is not empty
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  //...
}
```

## Property Data Model

Complete model of a property registered in the application:

```typescript
interface Property {
  title: string; // Property title

  description: string; // Description

  area: number; // Area

  price: number; // Property price

  rooms: number; // Number of rooms

  category: Category; // Property category

  parkingSpaces: number; // Parking spaces

  bathrooms: number; // Number of bathrooms

  propertyTaxPrice: number; // Property tax price

  condoPrice: number; // Apartment complex tax price

  owner: User; // Property owner user

  address: Address; // Property address
}
```

JSON response example:

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

## Property filters

The filters for property search are applied through `query parameters`.

For example:  
`GET http://localhost:3000/api/v1/properties?rooms=4&area=20,40`

The application will present a list of properties that have:

- `rooms=4` 4 rooms and
- `area=20,40` an area between 20m² and 40m²

The complete list of available parameters is present in the API documentation.

The code for the filters is present in the file `./src/properties/properties.service.ts`

---

## Testing

In order to simplify the demonstration in this challenge, I have only done unit testing for `PropertiesService` using the `jest` library

Run the command `npm run setup:db:test` to perform the `migrations` and `seeders` and create the test `schema`

After everything is set up, run the command `npm run test`

The test file is located in `src/properties/properties.service.spec.ts`
