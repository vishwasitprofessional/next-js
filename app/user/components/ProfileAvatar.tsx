import { UserRound } from "lucide-react";
import "./css/ProfileAvatar.css";
export default function ProfileAvatar({size = "large"}: {size?: "small" | "large"}) {
  return <div role="img" aria-label="Profile avatar" className={`profile-avatar flex shrink-0 items-center justify-center overflow-hidden rounded-full ${size === "small" ? "h-[72px] w-[72px]" : "h-[90px] w-[90px]"}`}><UserRound size={size === "small" ? 36 : 46} strokeWidth={1.3} aria-hidden="true" /></div>;
}
