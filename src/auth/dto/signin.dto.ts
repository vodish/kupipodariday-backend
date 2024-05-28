import { IsString, Length, MinLength } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @MinLength(2)
  password: string;
}
