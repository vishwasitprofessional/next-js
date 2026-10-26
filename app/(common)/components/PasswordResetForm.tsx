"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function PasswordResetForm({ token }: { token?: string }) {
  const resetting = token !== undefined;
  const validToken = !resetting || /^[a-f0-9]{64}$/.test(token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const inputClass = "mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") || "");
    const confirmPassword = String(data.get("confirmPassword") || "");
    if (resetting && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/${resetting ? "reset-password" : "forgot-password"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetting ? { token, password, confirmPassword } : { email: data.get("email") }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.message || "Something went wrong. Please try again.");
      } else {
        setMessage(result.message);
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">{resetting ? "Reset password" : "Forgot password?"}</h1>
        <p className="mb-8 text-center text-sm text-slate-500">{resetting ? "Enter and confirm your new password." : "Enter your email to receive a password reset link."}</p>
        <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
          {!validToken ? (
            <p role="alert" className="text-sm text-red-600">This reset link is invalid. Request a new link below.</p>
          ) : message ? (
            <p role="status" className="rounded-lg bg-green-50 p-4 text-sm text-green-800">{message}</p>
          ) : (
            <form onSubmit={submit}>
              {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</p>}
              {resetting ? (
                <>
                  <label className="mb-5 block text-sm font-medium text-slate-700" htmlFor="password">New password
                    <input className={inputClass} id="password" name="password" type="password" autoComplete="new-password" minLength={6} required />
                  </label>
                  <label className="mb-5 block text-sm font-medium text-slate-700" htmlFor="confirmPassword">Confirm new password
                    <input className={inputClass} id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={6} required />
                  </label>
                  <p className="mb-5 text-xs text-slate-500">Use at least 6 characters (maximum 72 bytes).</p>
                </>
              ) : (
                <label className="mb-5 block text-sm font-medium text-slate-700" htmlFor="email">Email address
                  <input className={inputClass} id="email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="Enter your email" required />
                </label>
              )}
              <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Please wait..." : resetting ? "Change password" : "Send reset link"}
              </button>
            </form>
          )}
          {resetting && !message && <Link href="/forgot-password" className="mt-5 block text-center text-sm text-blue-600 hover:underline">Request a new reset link</Link>}
          <Link href="/login" className="mt-5 block text-center text-sm font-semibold text-blue-600 hover:underline">Back to login</Link>
        </div>
      </div>
    </main>
  );
}
