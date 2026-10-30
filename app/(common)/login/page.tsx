"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center">Loading login...</main>}>
      <LoginForm />
    </Suspense>
  );
}

const googleErrors: Record<string, string> = {
  configuration: "Google sign-in is not configured yet. Please contact the administrator.",
  session: "Your sign-in session expired. Please try again.",
  cancelled: "Google sign-in was cancelled. Please try again.",
  failed: "Google sign-in failed. Please try again.",
  email: "Please use a Gmail or Google Workspace account, or sign in with your password.",
  account: "No matching account is available. Please contact the administrator.",
  inactive: "Your account is inactive. Please contact the administrator.",
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleError = googleErrors[searchParams.get("google_error") || ""] || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const url=`${process.env.NEXT_PUBLIC_SUB_FOLDER}/api/auth/login`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Login failed");
        return;
      }

      const type = result.user?.type;

      if (type !== "admin" && type !== "user") {
        setError("Your account is not allowed to sign in. Please contact the administrator.");
        return;
      }

      router.replace(`/${type}/dashboard`);
      // The dashboard is server-rendered from the auth cookie, so refresh the
      // router cache after the cookie has been set by the login response.
      router.refresh();

    } catch (error) {
      console.error("Login error:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
            U
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Login to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
          <form onSubmit={handleLogin}>
            {/* Error */}
            {(error || googleError) && (
              <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error || googleError}
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <Link href="/forgot-password" className="mt-3 block text-right text-sm font-medium text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <label className="mb-6 flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
                className="h-4 w-4 rounded border-slate-300 accent-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              />
              Remember me for 7 days
            </label>
            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <a
            href={rememberMe ? "/api/auth/google?rememberMe=true" : "/api/auth/google"}
            className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Sign in with Google
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account? <a href="/signup" className="font-semibold text-blue-600 hover:underline">Create account</a>
        </p>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 User Management
        </p>
      </div>
    </main>
  );
}
