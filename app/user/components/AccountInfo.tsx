import InfoRow from "./InfoRow";
import "./css/AccountInfo.css";
export default function AccountInfo() {
  return <section className="account-info" aria-labelledby="account-info-heading"><h2 id="account-info-heading" className="mb-5 text-3xl font-semibold tracking-tight xl:text-[40px]">Account info</h2><dl className="account-info-table overflow-hidden rounded-2xl border border-[#dce6ed] bg-white/65 text-lg"><InfoRow label="Username" value="vradeeamstorang93" /><InfoRow label="Password" value="••••••••••" /></dl></section>;
}
