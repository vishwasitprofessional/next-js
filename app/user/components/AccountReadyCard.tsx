import { BookUser } from "lucide-react";
import "./css/AccountReadyCard.css";
export default function AccountReadyCard() {
  return <a href="#basic-info" className="account-ready-card flex min-h-[265px] flex-col items-center justify-center gap-6 rounded-[20px] border border-[#d2e6f6] px-5 py-10 text-center text-xl text-[#1598dd] transition hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"><BookUser size={54} strokeWidth={1.7} className="-rotate-12" aria-hidden="true" /><span>Click to ready your account</span></a>;
}
