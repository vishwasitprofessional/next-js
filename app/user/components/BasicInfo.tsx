import { Camera } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import InfoRow from "./InfoRow";
import "./css/BasicInfo.css";
export default function BasicInfo() {
  return <section id="basic-info" aria-labelledby="basic-info-heading" className="basic-info scroll-mt-6">
    <h2 id="basic-info-heading" className="mb-5 text-3xl font-semibold tracking-tight xl:text-[40px]">Basic info</h2>
    <div className="mb-5 grid items-center gap-5 py-1 sm:grid-cols-[35%_1fr] sm:gap-6">
      <h3 className="text-xl font-semibold text-[#536a82]">Profile Picture</h3>
      <div className="flex items-center gap-6"><div className="relative"><ProfileAvatar /><span className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-[#294b70] p-1.5 text-white"><Camera size={19} aria-hidden="true" /></span></div><div className="space-y-1 text-lg"><span className="block">Upload new picture</span><span className="block text-[#008de2]">Remove</span></div></div>
    </div>
    <dl className="basic-info-table overflow-hidden rounded-2xl border border-[#dce6ed] bg-white/65 text-lg">
      <InfoRow label="Name" value="Vradee Amstorang" /><InfoRow label="Date of Birth" value="December 24, 1994" /><InfoRow label="Gender" value="Male" /><InfoRow label="Email" value="vradeeamstorang@gmail.com" />
    </dl>
  </section>;
}
