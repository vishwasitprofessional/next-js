"use client";

import { useState } from "react";
import "./../global.css";

import {
  LayoutDashboard,
  Users,
  Box,
  ShoppingCart,
  BarChart3,
  Mail,
  Settings,
  CircleHelp,
  FileText,
  LogOut,
  Menu,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Calendar,
  MoreVertical,
  TrendingUp,
  DollarSign,
  Package,
  UserPlus,
  PackagePlus,
  Zap,
  ChartLine,
  User,
  CreditCard,
} from "lucide-react";


function Dashboard() {

  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070914] text-slate-200">

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          z-50
          left-0
          top-0
          bottom-0
          w-[270px]
          bg-[#090b17]
          border-r
          border-slate-800/70
          flex
          flex-col
          transition-transform
          duration-300
          lg:translate-x-0
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >

        {/* Logo */}

        <div className="h-[80px] px-6 flex items-center border-b border-slate-800/70">

          <div className="relative mr-3">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-gradient-to-br
                from-violet-600
                to-blue-600
                flex
                items-center
                justify-center
                shadow-[0_0_30px_rgba(124,58,237,.35)]
              "
            >
              <span className="text-white text-xl font-black">
                C
              </span>
            </div>

            <div
              className="
                absolute
                -right-1
                -bottom-1
                w-3
                h-3
                rounded-full
                bg-emerald-400
                border-2
                border-[#090b17]
              "
            />

          </div>

          <div>
            <h1 className="font-bold text-lg text-white">
              CypherTech
            </h1>

            <p className="text-xs text-slate-400">
              Admin Panel
            </p>
          </div>

        </div>


        {/* Navigation */}

        <nav
          className="
    flex-1
    px-4
    py-6
    overflow-y-auto
    overflow-x-hidden
    custom-scrollbar
  "
        >

          <p className="px-3 mb-3 text-[11px] uppercase tracking-widest text-slate-500">
            Main Menu
          </p>


          {/* Dashboard */}

          <SidebarItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active
          />


          {/* =====================================================
    USERS MENU
===================================================== */}

          <div>

            {/* Users Main Button */}

            <button
              type="button"
              onClick={() => setUsersOpen(!usersOpen)}
              className={`
      w-full
      flex
      items-center
      justify-between
      px-4
      py-3
      rounded-xl
      mb-1
      transition-all
      duration-200
      ${usersOpen
                  ? "bg-violet-500/10 text-white"
                  : "text-slate-400 hover:bg-violet-500/10 hover:text-white"
                }
    `}
            >

              <div className="flex items-center gap-3">

                <Users
                  size={19}
                  className={`
          transition-colors
          ${usersOpen ? "text-violet-400" : ""}
        `}
                />

                <span className="text-sm">
                  Users
                </span>

              </div>


              {/* Arrow */}

              <ChevronRight
                size={16}
                className={`
        text-slate-500
        transition-transform
        duration-200
        ${usersOpen ? "rotate-90 text-violet-400" : ""}
      `}
              />

            </button>


            {/* =================================================
      USERS SUB MENU
  ================================================== */}

            {usersOpen && (
              <div
                className="
        ml-4
        pl-4
        mb-2
        border-l
        border-violet-500/20
      "
              >

                {/* All Users */}

                <a
                  href="/admin/users"
                  className="
          group
          flex
          items-center
          gap-3
          px-3
          py-2.5
          rounded-lg
          text-sm
          text-slate-400
          hover:bg-violet-500/10
          hover:text-white
          transition
        "
                >

                  <Users
                    size={16}
                    className="
            text-slate-500
            group-hover:text-violet-400
          "
                  />

                  <span>
                    All Users
                  </span>

                </a>


                {/* Create New User */}

                <a
                  href="/users/create"
                  className="
          group
          flex
          items-center
          gap-3
          px-3
          py-2.5
          rounded-lg
          text-sm
          text-slate-400
          hover:bg-violet-500/10
          hover:text-white
          transition
        "
                >

                  <UserPlus
                    size={16}
                    className="
            text-slate-500
            group-hover:text-violet-400
          "
                  />

                  <span>
                    Create New User
                  </span>

                </a>

              </div>
            )}

          </div>


          {/* Products */}

          <SidebarItem
            icon={<Box size={19} />}
            label="Products"
          />


          {/* Orders */}

          <SidebarItem
            icon={<ShoppingCart size={19} />}
            label="Orders"
            badge="12"
          />


          {/* Analytics */}

          <SidebarItem
            icon={<BarChart3 size={19} />}
            label="Analytics"
          />


          {/* Messages */}

          <SidebarItem
            icon={<Mail size={19} />}
            label="Messages"
            badge="6"
          />


          {/* Settings */}

          <SidebarItem
            icon={<Settings size={19} />}
            label="Settings"
          />


          <div className="my-6 border-t border-slate-800/70" />


          <p className="px-3 mb-3 text-[11px] uppercase tracking-widest text-slate-500">
            Other
          </p>


          <SidebarItem
            icon={<CircleHelp size={19} />}
            label="Help Center"
          />

          <SidebarItem
            icon={<FileText size={19} />}
            label="Reports"
          />

          <SidebarItem
            icon={<LogOut size={19} />}
            label="Logout"
            danger
          />

        </nav>


        {/* Sidebar Footer */}

        <div className="p-4 border-t border-slate-800/70">

          <div
            className="
              p-3
              rounded-xl
              bg-gradient-to-br
              from-violet-600/10
              to-blue-600/10
              border
              border-violet-500/10
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-violet-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <Zap
                  size={17}
                  className="text-violet-400"
                />
              </div>

              <div>

                <p className="text-xs font-medium text-white">
                  Pro Plan
                </p>

                <p className="text-[10px] text-slate-500">
                  72% used
                </p>

              </div>

            </div>


            <div className="mt-3 h-1.5 rounded-full bg-slate-800">

              <div
                className="
                  h-full
                  w-[72%]
                  rounded-full
                  bg-gradient-to-r
                  from-violet-500
                  to-blue-500
                "
              />

            </div>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="lg:ml-[270px] min-h-screen">


        {/* =================================================
            TOP NAVBAR
        ================================================== */}

        <header
          className="
            h-[80px]
            sticky
            top-0
            z-30
            bg-[#070914]/85
            backdrop-blur-xl
            border-b
            border-slate-800/70
          "
        >

          <div
            className="
              h-full
              px-4
              sm:px-6
              lg:px-8
              flex
              items-center
              justify-between
            "
          >

            {/* Left */}

            <div className="flex items-center gap-4">

              {/* Mobile Menu */}

              <button
                onClick={() => setSidebarOpen(true)}
                className="
                  lg:hidden
                  p-2
                  rounded-lg
                  hover:bg-slate-800
                "
              >
                <Menu size={23} />
              </button>


              {/* Desktop Menu */}

              <button
                className="
                  hidden
                  lg:block
                  p-2
                  rounded-lg
                  hover:bg-slate-800
                  text-slate-400
                "
              >
                <Menu size={21} />
              </button>


              {/* Search */}

              <div className="relative hidden sm:block">

                <Search
                  size={17}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="
                    w-[280px]
                    lg:w-[405px]
                    h-11
                    pl-11
                    pr-4
                    rounded-xl
                    bg-[#101426]
                    border
                    border-slate-800
                    text-sm
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    focus:border-violet-500/50
                    focus:ring-2
                    focus:ring-violet-500/10
                  "
                />

              </div>

            </div>


            {/* Right */}

            <div className="flex items-center gap-2 sm:gap-4">

              {/* Mobile Search */}

              <button
                className="
                  sm:hidden
                  p-2
                  rounded-lg
                  hover:bg-slate-800
                "
              >
                <Search size={20} />
              </button>


              {/* Notifications */}

              <button
                className="
                  relative
                  p-2
                  rounded-lg
                  hover:bg-slate-800
                "
              >

                <Bell size={20} />

                <span
                  className="
                    absolute
                    top-0
                    right-0
                    min-w-4
                    h-4
                    px-1
                    rounded-full
                    bg-violet-600
                    text-[9px]
                    flex
                    items-center
                    justify-center
                    text-white
                  "
                >
                  3
                </span>

              </button>


              {/* Messages */}

              <button
                className="
                  relative
                  p-2
                  rounded-lg
                  hover:bg-slate-800
                "
              >

                <Mail size={20} />

                <span
                  className="
                    absolute
                    top-0
                    right-0
                    min-w-4
                    h-4
                    px-1
                    rounded-full
                    bg-violet-600
                    text-[9px]
                    flex
                    items-center
                    justify-center
                    text-white
                  "
                >
                  6
                </span>

              </button>


              {/* =====================================================
    PROFILE DROPDOWN
===================================================== */}

              <div className="relative hidden sm:block">

                {/* Profile Button */}

                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="
      flex
      items-center
      gap-3
      pl-3
      rounded-xl
      border-l
      border-slate-800
      hover:bg-slate-800/40
      transition
      py-2
      pr-2
    "
                >

                  {/* Avatar */}

                  <div
                    className="
        w-10
        h-10
        rounded-full
        bg-gradient-to-br
        from-violet-500
        to-blue-500
        flex
        items-center
        justify-center
        font-bold
        text-white
        shadow-[0_0_20px_rgba(124,58,237,.25)]
      "
                  >
                    VK
                  </div>


                  {/* User Information */}

                  <div className="hidden md:block text-left">

                    <p className="text-sm font-semibold text-white">
                      Vishwas Kumar
                    </p>

                    <p className="text-xs text-slate-500">
                      Administrator
                    </p>

                  </div>


                  {/* Arrow */}

                  <ChevronDown
                    size={16}
                    className={`
        text-slate-500
        transition-transform
        duration-200
        ${profileOpen ? "rotate-180" : ""}
      `}
                  />

                </button>


                {/* =================================================
      DROPDOWN MENU
  ================================================== */}

                {profileOpen && (
                  <>

                    {/* Invisible click area */}

                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileOpen(false)}
                    />


                    {/* Dropdown */}

                    <div
                      className="
          absolute
          right-0
          top-[58px]
          z-50
          w-64
          rounded-2xl
          bg-[#0d1020]
          border
          border-slate-800
          shadow-[0_20px_60px_rgba(0,0,0,.55)]
          overflow-hidden
        "
                    >

                      {/* User Header */}

                      <div
                        className="
            p-4
            border-b
            border-slate-800
            bg-gradient-to-br
            from-violet-500/10
            to-blue-500/5
          "
                      >

                        <div className="flex items-center gap-3">

                          <div
                            className="
                w-11
                h-11
                rounded-full
                bg-gradient-to-br
                from-violet-500
                to-blue-500
                flex
                items-center
                justify-center
                font-bold
                text-white
              "
                          >
                            VK
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-white">
                              Vishwas Kumar
                            </p>

                            <p className="text-xs text-slate-500">
                              vishwas@example.com
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* Menu Items */}

                      <div className="p-2">

                        {/* Profile */}

                        <button
                          type="button"
                          onClick={() => {
                            setProfileOpen(false);
                            console.log("Profile clicked");
                          }}
                          className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              text-slate-300
              hover:bg-violet-500/10
              hover:text-white
              transition
            "
                        >

                          <User
                            size={17}
                            className="text-slate-400"
                          />

                          <span>
                            My Profile
                          </span>

                        </button>


                        {/* Billing */}

                        <button
                          type="button"
                          onClick={() => {
                            setProfileOpen(false);
                            console.log("Billing clicked");
                          }}
                          className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              text-slate-300
              hover:bg-violet-500/10
              hover:text-white
              transition
            "
                        >

                          <CreditCard
                            size={17}
                            className="text-slate-400"
                          />

                          <span>
                            Billing
                          </span>

                        </button>


                        {/* Settings */}

                        <button
                          type="button"
                          onClick={() => {
                            setProfileOpen(false);
                            console.log("Settings clicked");
                          }}
                          className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              text-slate-300
              hover:bg-violet-500/10
              hover:text-white
              transition
            "
                        >

                          <Settings
                            size={17}
                            className="text-slate-400"
                          />

                          <span>
                            Settings
                          </span>

                        </button>

                      </div>


                      {/* Logout */}

                      <div className="p-2 border-t border-slate-800">

                        <button
                          type="button"
                          onClick={() => {
                            setProfileOpen(false);

                            // Add your logout API here
                            console.log("Logout clicked");
                          }}
                          className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              text-red-400
              hover:bg-red-500/10
              transition
            "
                        >

                          <LogOut size={17} />

                          <span>
                            Logout
                          </span>

                        </button>

                      </div>

                    </div>

                  </>

                )}

              </div>

            </div>

          </div>

        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <div className="p-4 sm:p-6 lg:p-8">


          {/* Page Header */}

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
              mb-7
            "
          >

            <div>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-violet-500/15
                    flex
                    items-center
                    justify-center
                  "
                >

                  <LayoutDashboard
                    size={21}
                    className="text-violet-400"
                  />

                </div>

                <div>

                  <h2
                    className="
                      text-2xl
                      sm:text-3xl
                      font-bold
                      text-white
                    "
                  >
                    Dashboard
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Welcome back, Vishwas! Here's what's happening today.
                  </p>

                </div>

              </div>

            </div>


            {/* Date */}

            <div className="flex items-center gap-3">

              <button
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-[#101426]
                  border
                  border-slate-800
                  text-sm
                  text-slate-300
                "
              >

                <Calendar size={16} />

                Aug 26, 2026

                <ChevronDown size={15} />

              </button>


              <div
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-emerald-500/10
                  border
                  border-emerald-500/10
                "
              >

                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-emerald-400
                    animate-pulse
                  "
                />

                <span className="text-xs text-emerald-400">
                  Live Data
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              STAT CARDS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-4
              mb-6
            "
          >

            <StatCard
              title="Total Users"
              value="12,458"
              percentage="12.5%"
              icon={<Users size={21} />}
              iconBg="bg-violet-500/15"
              iconColor="text-violet-400"
            />

            <StatCard
              title="Total Orders"
              value="8,396"
              percentage="8.4%"
              icon={<ShoppingCart size={21} />}
              iconBg="bg-emerald-500/15"
              iconColor="text-emerald-400"
            />

            <StatCard
              title="Revenue"
              value="$124,580"
              percentage="14.2%"
              icon={<DollarSign size={21} />}
              iconBg="bg-blue-500/15"
              iconColor="text-blue-400"
            />

            <StatCard
              title="Products"
              value="1,248"
              percentage="6.7%"
              icon={<Package size={21} />}
              iconBg="bg-orange-500/15"
              iconColor="text-orange-400"
            />

          </div>


          {/* =================================================
              CHARTS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-3
              gap-5
              mb-6
            "
          >


            {/* Sales Chart */}

            <div
              className="
                xl:col-span-2
                bg-[#0e1122]
                border
                border-slate-800/70
                rounded-2xl
                p-5
                sm:p-6
              "
            >

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  justify-between
                  gap-4
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-violet-500/15
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <ChartLine
                      size={20}
                      className="text-violet-400"
                    />
                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      Sales Overview
                    </h3>

                    <p className="text-xs text-slate-500">
                      Revenue performance
                    </p>

                  </div>

                </div>


                {/* Period */}

                <div
                  className="
                    flex
                    bg-[#0a0d1b]
                    border
                    border-slate-800
                    rounded-lg
                    p-1
                  "
                >

                  <button className="px-3 py-1.5 text-xs text-slate-400">
                    7D
                  </button>

                  <button
                    className="
                      px-3
                      py-1.5
                      rounded-md
                      bg-violet-600
                      text-xs
                      text-white
                    "
                  >
                    1M
                  </button>

                  <button className="px-3 py-1.5 text-xs text-slate-400">
                    3M
                  </button>

                  <button className="px-3 py-1.5 text-xs text-slate-400">
                    1Y
                  </button>

                </div>

              </div>


              {/* Revenue */}

              <div className="mt-5">

                <div className="flex items-end gap-3">

                  <h3 className="text-2xl font-bold text-white">
                    $92,540
                  </h3>

                  <span
                    className="
                      text-sm
                      text-emerald-400
                      flex
                      items-center
                      gap-1
                    "
                  >
                    <TrendingUp size={15} />
                    18.4%
                  </span>

                </div>

                <p className="text-xs text-slate-500 mt-1">
                  vs previous period
                </p>

              </div>


              {/* Chart */}

              <div className="relative h-[280px] mt-6">

                <div
                  className="
                    absolute
                    inset-0
                    rounded-xl
                    opacity-60
                  "
                  style={{
                    backgroundImage:
                      `
                      linear-gradient(
                        rgba(148,163,184,.08) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        90deg,
                        rgba(148,163,184,.08) 1px,
                        transparent 1px
                      )
                      `,
                    backgroundSize: "20% 25%",
                  }}
                />


                <svg
                  viewBox="0 0 900 300"
                  preserveAspectRatio="none"
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                  "
                >

                  <defs>

                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#8b5cf6"
                        stopOpacity=".35"
                      />

                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>


                  {/* Area */}

                  <path
                    d="
                      M 0 230
                      C 90 190,100 210,150 175
                      C 210 130,230 160,285 185
                      C 350 215,390 115,450 130
                      C 520 145,550 65,610 75
                      C 680 90,720 120,760 80
                      C 820 25,850 45,900 15
                      L 900 300
                      L 0 300 Z
                    "
                    fill="url(#salesGradient)"
                  />


                  {/* Line */}

                  <path
                    d="
                      M 0 230
                      C 90 190,100 210,150 175
                      C 210 130,230 160,285 185
                      C 350 215,390 115,450 130
                      C 520 145,550 65,610 75
                      C 680 90,720 120,760 80
                      C 820 25,850 45,900 15
                    "
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="4"
                  />


                  {/* Points */}

                  <g
                    fill="#8b5cf6"
                    stroke="white"
                    strokeWidth="2"
                  >

                    <circle cx="0" cy="230" r="5" />
                    <circle cx="150" cy="175" r="5" />
                    <circle cx="285" cy="185" r="5" />
                    <circle cx="450" cy="130" r="5" />
                    <circle cx="610" cy="75" r="5" />
                    <circle cx="760" cy="80" r="5" />
                    <circle cx="900" cy="15" r="5" />

                  </g>

                </svg>

              </div>


              {/* X Axis */}

              <div
                className="
                  flex
                  justify-between
                  text-[10px]
                  text-slate-500
                  mt-2
                "
              >

                <span>Aug 20</span>
                <span>Aug 21</span>
                <span>Aug 22</span>
                <span>Aug 23</span>
                <span>Aug 24</span>
                <span>Aug 25</span>
                <span>Aug 26</span>

              </div>

            </div>


            {/* User Distribution */}

            <div
              className="
                bg-[#0e1122]
                border
                border-slate-800/70
                rounded-2xl
                p-5
                sm:p-6
              "
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold text-white">
                    User Distribution
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Users by category
                  </p>

                </div>

                <MoreVertical
                  size={18}
                  className="text-slate-500"
                />

              </div>


              {/* Donut */}

              <div className="flex justify-center my-8">

                <div className="relative w-44 h-44">

                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >

                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="13"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="13"
                      strokeDasharray="95.5 238.7"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="13"
                      strokeDasharray="83.5 238.7"
                      strokeDashoffset="-95.5"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#22d3a7"
                      strokeWidth="13"
                      strokeDasharray="59.7 238.7"
                      strokeDashoffset="-179"
                    />

                  </svg>


                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      flex-col
                      items-center
                      justify-center
                    "
                  >

                    <span className="text-2xl font-bold text-white">
                      12,458
                    </span>

                    <span className="text-xs text-slate-500">
                      Total Users
                    </span>

                  </div>

                </div>

              </div>


              {/* Legend */}

              <div className="space-y-4">

                <Legend
                  color="bg-violet-500"
                  title="New Users"
                  percentage="40%"
                />

                <Legend
                  color="bg-blue-500"
                  title="Returning"
                  percentage="35%"
                />

                <Legend
                  color="bg-emerald-400"
                  title="Premium"
                  percentage="25%"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              BOTTOM CARDS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-3
              gap-5
            "
          >


            {/* Recent Users */}

            <div
              className="
                bg-[#0e1122]
                border
                border-slate-800/70
                rounded-2xl
                p-5
              "
            >

              <div className="flex justify-between mb-5">

                <div>

                  <h3 className="font-semibold text-white">
                    Recent Users
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Latest registered users
                  </p>

                </div>

                <a
                  href="#"
                  className="text-xs text-violet-400"
                >
                  View All
                </a>

              </div>


              <div className="space-y-4">


                <UserRow
                  initials="VK"
                  name="Vishwas Kumar"
                  email="vishwas@example.com"
                />

                <UserRow
                  initials="PS"
                  name="Priya Sharma"
                  email="priya@example.com"
                />

                <UserRow
                  initials="RV"
                  name="Rohit Verma"
                  email="rohit@example.com"
                  inactive
                />

              </div>

            </div>


            {/* Recent Orders */}

            <div
              className="
                bg-[#0e1122]
                border
                border-slate-800/70
                rounded-2xl
                p-5
              "
            >

              <div className="flex justify-between mb-5">

                <div>

                  <h3 className="font-semibold text-white">
                    Recent Orders
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Latest transactions
                  </p>

                </div>

                <a
                  href="#"
                  className="text-xs text-violet-400"
                >
                  View All
                </a>

              </div>


              <div className="space-y-1">

                <OrderRow
                  id="#10248"
                  customer="Priya Sharma"
                  amount="$249"
                  status="Completed"
                />

                <OrderRow
                  id="#10247"
                  customer="Rohit Verma"
                  amount="$149"
                  status="Completed"
                />

                <OrderRow
                  id="#10246"
                  customer="Anjali Singh"
                  amount="$299"
                  status="Pending"
                  pending
                />

              </div>

            </div>


            {/* Quick Actions */}

            <div
              className="
                bg-[#0e1122]
                border
                border-slate-800/70
                rounded-2xl
                p-5
              "
            >

              <div className="flex justify-between mb-5">

                <div>

                  <h3 className="font-semibold text-white">
                    Quick Actions
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Frequently used actions
                  </p>

                </div>

                <Zap
                  size={18}
                  className="text-violet-400"
                />

              </div>


              <div className="grid grid-cols-2 gap-3">

                <ActionButton
                  icon={<UserPlus size={20} />}
                  title="Add User"
                  color="violet"
                />

                <ActionButton
                  icon={<PackagePlus size={20} />}
                  title="Add Product"
                  color="emerald"
                />

                <ActionButton
                  icon={<ShoppingCart size={20} />}
                  title="Create Order"
                  color="blue"
                />

                <ActionButton
                  icon={<BarChart3 size={20} />}
                  title="View Reports"
                  color="fuchsia"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================== */}

          <footer
            className="
              mt-8
              pt-5
              border-t
              border-slate-800/70
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-3
            "
          >

            <p className="text-xs text-slate-600">
              © 2026 CypherTech Admin Panel. All rights reserved.
            </p>

            <div className="flex items-center gap-5">

              <a
                href="#"
                className="text-xs text-slate-500 hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-xs text-slate-500 hover:text-white"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="text-xs text-slate-500 hover:text-white"
              >
                Help
              </a>

            </div>

          </footer>

        </div>

      </main>

    </div>
  )


/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  icon,
  label,
  active = false,
  arrow = false,
  badge,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  arrow?: boolean;
  badge?: string;
  danger?: boolean;
}) {
  return (
    <a
      href="#"
      className={`
        flex
        items-center
        justify-between
        px-4
        py-3
        rounded-xl
        mb-2
        transition
        ${active
          ? "bg-gradient-to-r from-violet-600/40 to-indigo-600/20 text-white shadow-[0_0_25px_rgba(124,58,237,.15)]"
          : danger
            ? "text-red-400 hover:bg-red-500/10"
            : "text-slate-400 hover:bg-violet-500/10 hover:text-white"
        }
      `}
    >

      <div className="flex items-center gap-3">

        {icon}

        <span className="text-sm">
          {label}
        </span>

      </div>


      {badge && (
        <span
          className="
            text-[10px]
            font-semibold
            bg-violet-600/20
            text-violet-300
            px-2
            py-1
            rounded-full
          "
        >
          {badge}
        </span>
      )}


      {arrow && (
        <ChevronRight
          size={15}
          className="text-slate-500"
        />
      )}

    </a>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  percentage,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  percentage: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div
      className="
        group
        bg-[#0e1122]
        border
        border-slate-800/70
        rounded-2xl
        p-5
        transition
        duration-200
        hover:-translate-y-1
        hover:border-violet-500/30
      "
    >

      <div className="flex items-start justify-between">

        <div
          className={`
            w-11
            h-11
            rounded-xl
            ${iconBg}
            flex
            items-center
            justify-center
            ${iconColor}
          `}
        >
          {icon}
        </div>

        <MoreVertical
          size={19}
          className="
            text-slate-500
            group-hover:text-white
          "
        />

      </div>


      <p className="text-sm text-slate-400 mt-4">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-white mt-1">
        {value}
      </h3>


      <div className="flex items-center gap-2 mt-3">

        <span
          className="
            flex
            items-center
            gap-1
            text-xs
            text-emerald-400
          "
        >

          <TrendingUp size={12} />

          {percentage}

        </span>

        <span className="text-xs text-slate-500">
          vs last month
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   LEGEND
========================================================= */

function Legend({
  color,
  title,
  percentage,
}: {
  color: string;
  title: string;
  percentage: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <span
          className={`
            w-3
            h-3
            rounded-full
            ${color}
          `}
        />

        <span className="text-sm text-slate-300">
          {title}
        </span>

      </div>

      <span className="text-sm font-semibold text-white">
        {percentage}
      </span>

    </div>
  );
}


/* =========================================================
   USER ROW
========================================================= */

function UserRow({
  initials,
  name,
  email,
  inactive = false,
}: {
  initials: string;
  name: string;
  email: string;
  inactive?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        py-3
        border-b
        border-slate-800/70
        last:border-0
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            w-9
            h-9
            rounded-full
            bg-gradient-to-br
            from-violet-500/30
            to-blue-500/20
            flex
            items-center
            justify-center
            text-xs
            font-bold
            text-violet-300
          "
        >
          {initials}
        </div>

        <div>

          <p className="text-sm text-white">
            {name}
          </p>

          <p className="text-[10px] text-slate-500">
            {email}
          </p>

        </div>

      </div>


      <span
        className={`
          text-[10px]
          px-2
          py-1
          rounded-full
          ${inactive
            ? "bg-slate-500/10 text-slate-400"
            : "bg-emerald-500/10 text-emerald-400"
          }
        `}
      >
        {inactive ? "Inactive" : "Active"}
      </span>

    </div>
  );
}


/* =========================================================
   ORDER ROW
========================================================= */

function OrderRow({
  id,
  customer,
  amount,
  status,
  pending = false,
}: {
  id: string;
  customer: string;
  amount: string;
  status: string;
  pending?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        py-3
        border-b
        border-slate-800/70
        last:border-0
      "
    >

      <div>

        <p className="text-xs text-violet-400">
          {id}
        </p>

        <p className="text-sm text-white mt-1">
          {customer}
        </p>

      </div>


      <div className="text-right">

        <p className="text-sm font-semibold text-white">
          {amount}
        </p>

        <span
          className={`
            inline-flex
            mt-1
            px-2
            py-0.5
            rounded-full
            text-[9px]
            ${pending
              ? "bg-orange-500/10 text-orange-400"
              : "bg-emerald-500/10 text-emerald-400"
            }
          `}
        >
          {status}
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   QUICK ACTION BUTTON
========================================================= */

function ActionButton({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  color: "violet" | "emerald" | "blue" | "fuchsia";
}) {
  const colors = {
    violet: {
      bg: "bg-violet-500/10",
      hover: "hover:bg-violet-500/20",
      icon: "bg-violet-500/15",
      text: "text-violet-400",
    },

    emerald: {
      bg: "bg-emerald-500/10",
      hover: "hover:bg-emerald-500/20",
      icon: "bg-emerald-500/15",
      text: "text-emerald-400",
    },

    blue: {
      bg: "bg-blue-500/10",
      hover: "hover:bg-blue-500/20",
      icon: "bg-blue-500/15",
      text: "text-blue-400",
    },

    fuchsia: {
      bg: "bg-fuchsia-500/10",
      hover: "hover:bg-fuchsia-500/20",
      icon: "bg-fuchsia-500/15",
      text: "text-fuchsia-400",
    },
  };

  const c = colors[color];

  return (
    <button
      className={`
        p-4
        rounded-xl
        border
        border-slate-800/50
        ${c.bg}
        ${c.hover}
        transition
      `}
    >

      <div
        className={`
          w-10
          h-10
          rounded-lg
          mx-auto
          ${c.icon}
          flex
          items-center
          justify-center
          ${c.text}
        `}
      >
        {icon}
      </div>

      <p className="text-xs text-white mt-3">
        {title}
      </p>

    </button>
  );
}
}


export default Dashboard