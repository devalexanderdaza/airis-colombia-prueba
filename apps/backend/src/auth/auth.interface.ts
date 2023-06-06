/**
 * Interface for login
 * @interface
 * @export
 */
export interface ILogin {
  email: string;
  password: string;
}

/**
 * Interface for JWT payload
 * @interface
 * @export
 * @property {string} email - User email
 * @property {string} fullName - User full name
 * @property {number} sub - User id
 */
export interface IJwtPayload {
  email: string;
  fullName: string;
  sub: number;
}
