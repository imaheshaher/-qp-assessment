import {
  IsNumber,
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['User', 'Admin'])
  userType: string;

  @IsBoolean()
  active = true;
}
