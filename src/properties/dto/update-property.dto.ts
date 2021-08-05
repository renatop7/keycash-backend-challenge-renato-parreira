import { PartialType, PickType } from '@nestjs/swagger';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(
  PickType(CreatePropertyDto, [
    'title',
    'description',
    'rooms',
    'propertyTaxPrice',
    'price',
    'parkingSpaces',
    'condoPrice',
    'categoryId',
  ] as const),
) {}
