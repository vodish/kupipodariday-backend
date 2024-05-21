import { IsString, IsOptional, IsUrl, IsArray, Length, Max } from 'class-validator';

export class CreateWishlistlistDto {
    @IsString()
    @Length(1, 250)
    name: string;

    @IsUrl()
    image: string; // "https://i.pravatar.cc/150?img=3",

    @IsOptional()
    @IsString()
    @Length(0, 1500)
    description?: string;

    @IsArray()
    itemsId: number[]
}
