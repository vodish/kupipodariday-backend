import { IsString, IsUrl, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateWishlistDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsUrl()
    image: string;

    @IsArray()
    itemsId: number[];
}
