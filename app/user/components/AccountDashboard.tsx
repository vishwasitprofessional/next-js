import SettingsSidebar from "./SettingsSidebar";
import DashboardHeader from "./DashboardHeader";
import BasicInfo from "./BasicInfo";
import AccountInfo from "./AccountInfo";
import AccountReadyCard from "./AccountReadyCard";
import DashboardDecoration from "./DashboardDecoration";
import "./css/AccountDashboard.css";

export default function AccountDashboard() {
  return (
    <div className="account-dashboard min-h-screen text-[#0c1028] lg:grid lg:grid-cols-[25%_1fr]">
      <SettingsSidebar />
      <div className="min-w-0">
        <DashboardHeader />
        <main className="px-5 pb-12 pt-5 sm:px-8 lg:pl-[6%] lg:pr-[3%] lg:pt-1">
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl xl:text-[54px]">
            Account Settings
          </h1>
          <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,2.25fr)_minmax(240px,1fr)]">
            <div className="min-w-0 space-y-9">
              <BasicInfo />
              <AccountInfo />
            </div>
            <aside className="flex flex-col gap-8 xl:pt-9">
              <DashboardDecoration />
              <AccountReadyCard />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
