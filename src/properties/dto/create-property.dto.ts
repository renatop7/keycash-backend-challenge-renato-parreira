import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, Min, IsNumber, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreatePropertyDto {

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsInt()
    @Min(0)
    @ApiProperty()
    rooms: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    area: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    price: number;

    @IsInt()
    @Min(1)
    @ApiProperty()
    categoryId: number;

    @IsInt()
    @Min(0)
    @ApiPropertyOptional()
    parkingSpaces?: number;

    @IsInt()
    @Min(0)
    @ApiPropertyOptional()
    bathrooms?: number;

    @IsNumber()
    @Min(0)
    @ApiPropertyOptional()
    propertyTaxPrice?: number;

    @IsNumber()
    @Min(0)
    @ApiPropertyOptional()
    condoPrice?: number;

    @ValidateNested()
    @Type(() => CreateAddressDto)
    @ApiProperty()
    address: CreateAddressDto

    ownerId?:number;
}
