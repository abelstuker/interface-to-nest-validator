import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber, Min, Max, MinLength, MaxLength, IsDate, IsUrl, IsUUID, IsEnum, IsArray, ArrayMinSize, ArrayMaxSize, Equals, Matches, IsInt } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @Expose()
  role: UserRole;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  age: number;

  @IsString()
  @IsOptional()
  @Expose()
  website?: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  createdAt: string;

  @IsArray()
  @IsNotEmpty()
  @Expose()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @Expose()
  idNumber: string;

  constructor(partial?: Partial<UserDto>) {
    Object.assign(this, partial || {});
  }
}

