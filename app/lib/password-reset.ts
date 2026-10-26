import { createHash, randomBytes } from "node:crypto";
import nodemailer from "nodemailer";

export class ResetEmailError extends Error {
  constructor(public code: string, public reason: string) {
    super(`SMTP password reset email failed (${code}; ${reason})`);
    this.name = "ResetEmailError";
  }
}

export function newResetToken() {
  return randomBytes(32).toString("hex");
}

export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function resetEmailConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM?.trim();
  const APP_URL = process.env.APP_URL?.trim();
  if (!host || !user || !pass || !from || !APP_URL) {
    throw new Error("Password reset SMTP email is not configured");
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number");
  }
  const url = new URL(APP_URL);
  if (url.username || url.password || (url.protocol !== "https:" &&
      !(process.env.NODE_ENV !== "production" && url.protocol === "http:"))) {
    throw new Error("APP_URL must use HTTPS in production");
  }
  return { host, port, user, pass, from, url };
}

export async function sendResetEmail(email: string, token: string) {
  const { host, port, user, pass, from, url } = resetEmailConfig();
  url.pathname = `${url.pathname.replace(/\/$/, "")}/reset-password`;
  url.search = "";
  url.hash = "";
  url.searchParams.set("token", token);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
  try {
    await transporter.sendMail({
      from, to: email, subject: "Reset your password",
      text: `Open this link to choose a new password:\n\n${url.toString()}\n\nThis link expires in 30 minutes and can only be used once. If you did not request this, you can ignore this email.`,
    });
  } catch (error) {
    // Only expose fixed diagnostics, never raw SMTP responses or credentials.
    const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
    switch (code) {
      case "EAUTH":
        throw new ResetEmailError("EAUTH", "Check SMTP_USER and SMTP_PASS");
      case "EENVELOPE":
        throw new ResetEmailError("EENVELOPE", "Check SMTP_FROM and mailbox sending permissions");
      case "ETIMEDOUT":
      case "ECONNECTION":
      case "ESOCKET":
      case "EDNS":
        throw new ResetEmailError(code, "Check SMTP_HOST, SMTP_PORT, TLS settings, and network connectivity");
      default:
        throw new ResetEmailError("SMTP_ERROR", "Check the domain email provider's delivery logs and sending limits");
    }
  }
}
