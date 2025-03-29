// interfaces.ts

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export interface IUser {
  /**
   * @email
   * @required
   */
  email: string;

  /**
   * @minLength(2)
   * @maxLength(50)
   */
  name: string;

  /**
   * @isEnum(UserRole)
   */
  role: UserRole;

  /**
   * @min(18)
   * @max(120)
   * @isInt
   */
  age: number;

  /**
   * @isUrl
   * @notRequired
   */
  website?: string;

  /**
   * @isDate
   */
  createdAt: string;

  /**
   * @isArray
   * @arrayMinSize(1)
   */
  tags: string[];

  /**
   * @pattern(/^[A-Z]{2}\d{6}$/)
   */
  idNumber: string;
}
