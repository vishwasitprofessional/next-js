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

export async function createToken(user: AuthUser) {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    type: user.type,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("1d")
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