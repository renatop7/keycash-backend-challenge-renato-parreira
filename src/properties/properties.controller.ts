import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  UsePipes,
  ValidationPipe,
  ParseArrayPipe,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyFiltersDto } from './dto/filters.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PropertyTypes } from '../enums/property-types.enum';

@ApiTags('Imóveis')
@Controller({ path: 'properties', version: '1' })
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Somente usuários cadastrados podem inserir um novo imóvel',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 201, description: 'Imóvel criado com sucesso.' })
  create(@Req() req, @Body() createPropertyDto: CreatePropertyDto) {
    
    if (req.user.role) {
      throw new UnauthorizedException(
        'Somente usuários da plataforma podem inserir imóveis.',
      );
    }

    createPropertyDto.ownerId = req.user.id;
    return this.propertiesService.create(createPropertyDto);
  }

  @ApiQuery({
    name: 'state',
    description: 'Filtro por id de estado, aceita um ou mais valores',
    example: '1 ou 1,2,3',
    required: false,
  })
  @ApiQuery({
    name: 'city',
    description: 'Filtro por id de cidade, aceita um ou mais valores',
    example: '1 ou 1,2,3',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    description: 'Filtro por id de tipo de imóvel, aceita um ou mais valores',
    example: '1 ou 1,2,3',
    required: false,
  })
  @ApiQuery({
    name: 'category',
    description:
      'Filtro por id de categoria de imóvel, aceita um ou mais valores',
    example: '1 ou 1,2,3',
    required: false,
  })
  @ApiQuery({
    name: 'price',
    description:
      'Filtro por preço de imóvel, aceita um valor ou range de valores: min,máx',
    example: '1 ou 10000,50000',
    required: false,
  })
  @ApiQuery({
    name: 'parkingSpaces',
    description:
      'Filtro por quantidade de vagas de garagem, aceita um valor ou range de valores: min,máx',
    example: '1 ou 1,5',
    required: false,
  })
  @ApiQuery({
    name: 'area',
    description:
      'Filtro por metragem do imóvel, aceita um valor ou range de valores: min,máx',
    example: '25 ou 15,40',
    required: false,
  })
  @ApiQuery({
    name: 'rooms',
    description:
      'Filtro por quantidade de quartos, aceita um valor ou range de valores: min,máx',
    example: '1 ou 1,5',
    required: false,
  })
  @Get()
  async findAll(@Query() filters: PropertyFiltersDto) {
    const propertiesList = await this.propertiesService.findAll(filters);
    return propertiesList;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const property = await this.propertiesService.findOne(+id);
    if (property) {
      return property;
    } else {
      throw new NotFoundException('Imóvel não encontrado');
    }
  }

  @Get('owner/:id')
  async findAllByOwner(@Param('id') id: string) {
    return await this.propertiesService.findAllByOwner(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch(':id/address')
  updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.propertiesService.updatePropertyAddress(+id, updateAddressDto);
  }
}
