import { IsString, IsUrl, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateWishlistDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsUrl()
    image: string;

    @IsNumber()
    owner: number;

    @IsArray()
    itemsId: number[];
}
