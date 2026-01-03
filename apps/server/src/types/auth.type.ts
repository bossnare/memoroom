export type LoginPayload = {
  email: string;
  password: string;
};

export type JWTPayload = { sub: string; email: string; role: string };
