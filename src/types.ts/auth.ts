export type AuthRole = "admin" | "user";

export type AuthTokenPayload = {
  sub: string;
  role: AuthRole;
  email: string;
  exp: number;
};
