import { jwtVerify, SignJWT } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const secretKey = new TextEncoder().encode(secret);

export interface AuthUser {
  id: number;
  email: string;
  type: string;
}

export function getSessionMaxAge(rememberMe: boolean = false) {
  return 60 * 60 * 24 * (rememberMe ? 7 : 1);
}

export async function createToken(user: AuthUser, rememberMe: boolean = false) {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    type: user.type,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + getSessionMaxAge(rememberMe))
    .sign(secretKey);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    return payload as unknown as AuthUser;
  } catch {
    return null;
  }
}
