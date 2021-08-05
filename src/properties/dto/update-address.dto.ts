import { PartialType, PickType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PickType(CreateAddressDto, [
  'street',
  'number',
  'complement',
  'district',
  'cityId',
  'stateId',
  'countryId',
  'zipCode'
]) {
  propertyId: number;
}
