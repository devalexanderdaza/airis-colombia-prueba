/**
 * User interface
 * @interface IUser
 * @export
 * @interface
 * @property {number} id - User id
 * @property {string} fullName - User full name
 * @property {string} email - User email
 * @property {string} username - User username
 * @property {string} password - User password
 * @property {Date} createdAt - User created at
 * @property {Date} updatedAt - User updated at
 */
export interface IUser {
  id?: number;
  fullName: string;
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Login success response interface
 * @interface ILoginSuccessResponse
 * @export
 * @interface
 * @property {string} access_token - Access token
 * @property {string} fullName - User full name
 * @property {string} email - User email
 */
export interface ILoginSuccessResponse {
  access_token: string;
  fullName: string;
  email: string;
}
