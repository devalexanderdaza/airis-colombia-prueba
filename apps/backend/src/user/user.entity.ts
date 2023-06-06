import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUser } from './user.interface';

/**
 * User entity
 * @class UserEntity
 * @implements {IUser}
 * @export
 * @class
 * @property {number} id - User id
 * @property {string} fullName - User full name
 * @property {string} email - User email
 * @property {string} username - User username
 * @property {string} password - User password
 * @property {Date} createdAt - User created at
 * @property {Date} updatedAt - User updated at
 */
@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updtedAt: Date;
}
