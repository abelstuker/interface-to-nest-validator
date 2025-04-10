# interface-to-nest-validator

[![stability-wip](https://img.shields.io/badge/stability-wip-lightgrey.svg)]()

A utility package that generates NestJS validator classes from TypeScript interfaces. This tool parses your interface definitions and generates corresponding validation classes using NestJS class-validator decorators by scanning comments above each property.

## How It Works

This package analyzes TypeScript interface files and creates validator classes that leverage NestJS class-validator decorators. It extracts validation rules from special `@validate` comments placed above interface properties.

## Usage

1. Create TypeScript interfaces with `@validate` comments
2. Run the utility to generate validator classes
3. Use the generated classes in your NestJS application

## Validation Keywords

The following keywords can be used in `@validate` comments to apply specific validation rules:

| Keyword           | Description                | Generated Decorator |
| ----------------- | -------------------------- | ------------------- |
| `email`           | Validates email format     | `@IsEmail()`        |
| `required`        | Ensures field is not empty | `@IsNotEmpty()`     |
| `minLength(n)`    | Minimum string length      | `@MinLength(n)`     |
| `maxLength(n)`    | Maximum string length      | `@MaxLength(n)`     |
| `min(n)`          | Minimum numeric value      | `@Min(n)`           |
| `max(n)`          | Maximum numeric value      | `@Max(n)`           |
| `pattern(regex)`  | Matches regular expression | `@Matches(regex)`   |
| `date`            | Validates date objects     | `@IsDate()`         |
| `url`             | Validates URLs             | `@IsUrl()`          |
| `UUID`            | Validates UUID format      | `@IsUUID()`         |
| `enum(values)`    | Must match enum values     | `@IsEnum(values)`   |
| `array`           | Must be an array           | `@IsArray()`        |
| `arrayMinSize(n)` | Minimum array length       | `@ArrayMinSize(n)`  |
| `arrayMaxSize(n)` | Maximum array length       | `@ArrayMaxSize(n)`  |
| `equals(value)`   | Must match exact value     | `@Equals(value)`    |
| `boolean`         | Must be boolean            | `@IsBoolean()`      |
| `number`          | Must be number             | `@IsNumber()`       |
| `integer`         | Must be integer            | `@IsInt()`          |
| `string`          | Must be string             | `@IsString()`       |
| `datestring`      | Validates date strings     | `@IsDateString()`   |
| `hexcolor`        | Validates hex color format | `@IsHexColor()`     |
| `latitude`        | Validates latitude         | `@IsLatitude()`     |
| `longitude`       | Validates longitude        | `@IsLongitude()`    |

More will be added in the future.

## Example

Given the following TypeScript interface:

```typescript
interface User {
  /**
   * The identifier of the user
   * Notice that we can leave out @validate number here, since its validation is derived from the type
   */
  id: number;
  /**
   * The name of the user
   * Notice that we can leave out @validate string here, since its validation is derived from the type
   */
  name: string;
  /**
   * The email of the user
   * @validate email
   */
  email: string;
  /**
   * The favorite color of the user
   * @validate hexcolor
   */
  favoriteColor: string;
  /**
   * Whether the user likes bananas
   * @validate boolean
   */
  likesBananas: boolean;
  /**
   * Whether the user likes apples
   * Notice that we can leave out the @validate boolean annotation, since its validation is dereived from the type
   * @notRequired
   */
  likesApples: boolean;
}
```

Generated output:

```typescript
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
```
