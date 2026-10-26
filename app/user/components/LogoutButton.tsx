"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) throw new Error("Logout failed");

      window.location.replace("/login");
    } catch {
      setError("Unable to log out. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut size={18} aria-hidden="true" />
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
