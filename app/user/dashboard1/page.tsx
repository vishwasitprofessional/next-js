import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-slate-900">
              Dashboard
            </h1>
            <LogoutButton />
          </div>
          <p className="mt-2 text-slate-500">
            You are successfully logged in.
          </p>
        </div>
      </div>
    </main>
  );
}
