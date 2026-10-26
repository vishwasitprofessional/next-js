"use client";

import { Bell, CircleHelp, Globe, Menu, Shield, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./css/SettingsNavigation.css";

const items = [
  { label: "Account", icon: UserRound, href: "/user/account" },
  { label: "Notifications", icon: Bell, href: "/user/notifications" },
  { label: "Privacy", icon: Shield, href: "/user/privacy" },
  { label: "Languages", icon: Globe, href: "/user/languages" },
  { label: "Help", icon: CircleHelp, href: "/user/help" },
];

export default function SettingsNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label="Open settings menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-sky-600 p-3 text-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 lg:hidden"
      >
        <Menu size={24} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        aria-label="Settings"
        className={`settings-navigation fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col gap-2 overflow-y-auto bg-white p-4 shadow-xl transition-transform lg:static lg:inset-auto lg:z-auto lg:w-auto lg:translate-x-0 lg:flex-col lg:gap-2.5 lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-2 flex items-center justify-between lg:hidden">
          {!isOpen && (
            <span className="text-lg font-semibold">Settings</span>
          )}
          {isOpen && (
            <button
              type="button"
              aria-label="Close settings menu"
              onClick={() => setIsOpen(false)}
              className="ml-auto rounded-full p-1 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <X size={22} aria-hidden="true" />
            </button>
          )}
        </div>
        {items.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setIsOpen(false)}
              className={`settings-navigation-item flex shrink-0 items-center gap-5 rounded-[20px] px-6 py-4 text-lg xl:text-[23px] ${isActive ? "settings-navigation-active" : ""}`}
            >
              <Icon size={29} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
