import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountDashboard from "../components/AccountDashboard";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get("access_token")?.value) redirect("/login");
  return <AccountDashboard />;
}
