import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IUser } from './user.interface';

/**
 * Create user dto
 * @class CreateUserDto
 * @implements {IUser}
 * @export
 * @class
 * @property {string} fullName - User full name
 * @property {string} email - User email
 * @property {string} username - User username
 * @property {string} password - User password
 */
export class CreateUserDto implements IUser {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(70)
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  password: string;
}
