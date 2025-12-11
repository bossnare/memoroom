export type LoginPayload = {
  email: string;
  password: string;
};

export type JWTPayload = { id: string; email: string; role: string };
