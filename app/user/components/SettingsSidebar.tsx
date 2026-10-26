import SettingsNavigation from "./SettingsNavigation";
import "./css/SettingsSidebar.css";

export default function SettingsSidebar() {
  return (
    <aside className="settings-sidebar m-4 rounded-[28px] px-3 py-6 lg:mb-7 lg:mr-5 lg:mt-3 lg:min-h-[calc(100vh-40px)] lg:pt-[clamp(60px,17vh,170px)]">
      <h2 className="mb-6 px-6 text-4xl font-bold tracking-tight xl:text-5xl">Settings</h2>
      <SettingsNavigation />
    </aside>
  );
}
