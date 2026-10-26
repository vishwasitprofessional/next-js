import { ChevronRight } from "lucide-react";
import "./css/InfoRow.css";
export default function InfoRow({label, value}: {label: string; value: string}) {
  return <div className="info-row grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-4 sm:grid-cols-[35%_1fr_auto] sm:px-6">
    <dt className="text-[#455e76]">{label}</dt><dd className="col-start-1 row-start-2 break-words sm:col-start-auto sm:row-start-auto">{value}</dd><ChevronRight size={23} strokeWidth={1.8} className="col-start-2 row-span-2 row-start-1 sm:col-start-auto sm:row-span-1 sm:row-start-auto" aria-hidden="true" />
  </div>;
}
