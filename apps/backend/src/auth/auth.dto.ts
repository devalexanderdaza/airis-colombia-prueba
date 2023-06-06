import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

import { ILoginSuccessResponse } from 'src/user/user.interface';

import { ILogin } from './auth.interface';

/**
 * Login DTO
 * @class LoginDto
 * @implements {ILogin}
 * @Property {string} email - User email
 * @Property {string} password - User password
 */
export class LoginDto implements ILogin {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  password: string;
}

/**
 * Login success response DTO
 * @class LoginSuccessResponseDto
 * @implements {ILoginSuccessResponse}
 * @Property {string} access_token - Access token
 * @Property {string} fullName - User full name
 * @Property {string} email - User email
 */
export class LoginSuccessResponseDto implements ILoginSuccessResponse {
  access_token: string;
  fullName: string;
  email: string;
}
