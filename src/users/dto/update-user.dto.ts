import { IsString, Length, IsUrl, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @Length(2, 30)
  username: string;

  @Length(2, 200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
