import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/user/user.entity';

import { Repository } from 'typeorm';

import { CreateUserDto } from 'src/user/user.dto';

import { LoginDto, LoginSuccessResponseDto } from './auth.dto';
import { IJwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  /**
   * Signup user
   * @param user | CreateUserDto
   * @returns Promise<UserEntity>
   * @throws {Error} Something went wrong
   */
  async signup(user: CreateUserDto): Promise<UserEntity> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  /**
   * Validate user
   * @param data | LoginDto
   * @returns Promise<UserEntity>
   * @throws {BadRequestException} Invalid credentials
   * @throws {NotFoundException} User not found
   * @throws {Error} Something went wrong
   */
  async validateUser(data: LoginDto): Promise<UserEntity> {
    try {
      const foundUser: UserEntity = await this.userRepository.findOne({
        where: { email: data.email },
      });
      console.log(foundUser);
      if (foundUser) {
        if (await bcrypt.compare(data.password, foundUser.password)) {
          return foundUser;
        }
        throw new BadRequestException('Invalid credentials');
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  /**
   * Login user
   * @param user | UserEntity
   * @returns Promise<LoginSuccessResponseDto>
   * @throws {Error} Something went wrong
   */
  async login(user: UserEntity): Promise<LoginSuccessResponseDto> {
    try {
      const payload: IJwtPayload = {
        email: user.email,
        sub: user.id,
        fullName: user.fullName,
      };
      return {
        access_token: this.jwtService.sign(payload),
        fullName: user.fullName,
        email: user.email,
      };
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
