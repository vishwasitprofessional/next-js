import { Bell, CircleHelp, Globe, Shield, UserRound } from "lucide-react";
import "./css/SettingsNavigation.css";
const items = [{label: "Account", icon: UserRound}, {label: "Notifications", icon: Bell}, {label: "Privacy", icon: Shield}, {label: "Languages", icon: Globe}, {label: "Help", icon: CircleHelp}];
export default function SettingsNavigation() {
  return <nav aria-label="Settings" className="settings-navigation flex gap-2 overflow-x-auto lg:flex-col lg:gap-2.5">
    {items.map(({label, icon: Icon}, index) => <div key={label} aria-current={index === 0 ? "page" : undefined} className={`settings-navigation-item flex shrink-0 items-center gap-5 rounded-[20px] px-6 py-4 text-lg xl:text-[23px] ${index === 0 ? "settings-navigation-active" : ""}`}><Icon size={29} strokeWidth={1.7} aria-hidden="true" /><span>{label}</span></div>)}
  </nav>;
}
