// @ts-nocheck
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class User {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  favoriteColor: string;

  @IsBoolean()
  @IsNotEmpty()
  likesBananas: boolean;

  @IsBoolean()
  @IsOptional()
  likesApples: boolean;
}
