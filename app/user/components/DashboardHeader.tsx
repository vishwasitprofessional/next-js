import Link from "next/link";
import ProfileAvatar from "./ProfileAvatar";
import "./css/DashboardHeader.css";
export default function DashboardHeader() {
  return <header className="dashboard-header flex min-h-[106px] items-center justify-end gap-6 px-6 sm:gap-12 lg:px-12">
    <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-5 text-base sm:gap-12 sm:text-[23px]">
      <Link href="/" className="transition-colors hover:text-sky-600">Home</Link>
      <span>Explore</span><span>Pricing</span><span>About</span>
    </nav>
    <a href="#basic-info" aria-label="Your profile" className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-sky-600"><ProfileAvatar size="small" /></a>
  </header>;
}
