import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator";

export class CreateAddressDto{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiPropertyOptional()
    @IsNumber()
    number: number;

    @ApiPropertyOptional()
    @IsString()
    complement: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    district: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cityId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    stateId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    countryId: number;

    @ApiProperty()
    @IsNumberString(null, { message: 'zipCode must contain only numbers.'})
    @IsNotEmpty()
    @Length(8, 8, { message: 'zipCode must be equal to 8 characters.'})
    zipCode: string;

    propertyId?: number;
}