import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { UserEntity } from 'src/user/user.entity';

import { LoginDto } from '../auth.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Validate user
   * @param data | LoginDto
   * @returns Promise<UserEntity>
   * @throws {UnauthorizedException} Unauthorized
   * @throws {Error} Something went wrong
   */
  async validate(data: LoginDto): Promise<UserEntity> {
    try {
      const foundUser = await this.authService.validateUser(data);
      if (!foundUser) {
        throw new UnauthorizedException();
      }
      return foundUser;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
