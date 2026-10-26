import type { Metadata } from "next";
import PasswordResetForm from "../components/PasswordResetForm";

export const metadata: Metadata = {
  title: "Reset password",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({ searchParams }: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  return <PasswordResetForm token={typeof token === "string" ? token : ""} />;
}
