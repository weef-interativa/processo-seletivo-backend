export interface IJwtPayload {
  username?: string;
  sub?: number;
  exp?: number;
  iat?: number;
}
