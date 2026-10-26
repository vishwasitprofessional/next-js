"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ProfileAvatar from "./ProfileAvatar";
import LogoutButton from "./LogoutButton";
import "./css/DashboardHeader.css";

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="dashboard-header flex min-h-[106px] items-center justify-end gap-6 px-6 sm:gap-12 lg:px-12">
      <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-5 text-base sm:gap-12 sm:text-[23px]">
        <Link href="/" className="transition-colors hover:text-sky-600">Home</Link>
        <span>Explore</span>
        <span>Pricing</span>
        <span>About</span>
      </nav>
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Your profile"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className="rounded-full focus-visible:outline-2 focus-visible:outline-sky-600"
        >
          <ProfileAvatar size="small" />
        </button>
        {isOpen && (
          <div
            role="menu"
            aria-label="Account menu"
            className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
          >
            <Link
              href="/user/account"
              role="menuitem"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
            <Link
              href="/user/profile"
              role="menuitem"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/user/change-password"
              role="menuitem"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Change Password
            </Link>
            <div role="menuitem" className="border-t border-gray-100 px-2 py-1">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
