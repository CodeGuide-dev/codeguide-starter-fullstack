"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "@/lib/auth-client"
import {
  IconDashboard,
  IconHelp,
  IconSearch,
  IconSettings,
  IconWallet,
  IconTrendingUp,
  IconCreditCard,
  IconTarget,
  IconChartPie,
  IconPlus,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const staticData = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Assets",
      url: "/dashboard/assets",
      icon: IconWallet,
    },
    {
      title: "Investments",
      url: "/dashboard/investments",
      icon: IconTrendingUp,
    },
    {
      title: "Expenses",
      url: "/dashboard/expenses",
      icon: IconCreditCard,
    },
    {
      title: "Income",
      url: "/dashboard/income",
      icon: IconTarget,
    },
  ],
  navQuickActions: [
    {
      title: "Add Asset",
      icon: IconWallet,
      url: "/dashboard/assets?action=add",
      items: [
        {
          title: "Real Estate",
          url: "/dashboard/assets?action=add&type=real_estate",
        },
        {
          title: "Vehicle",
          url: "/dashboard/assets?action=add&type=vehicle",
        },
        {
          title: "Savings",
          url: "/dashboard/assets?action=add&type=savings",
        },
      ],
    },
    {
      title: "Add Investment",
      icon: IconTrendingUp,
      url: "/dashboard/investments?action=add",
      items: [
        {
          title: "Stocks",
          url: "/dashboard/investments?action=add&type=stocks",
        },
        {
          title: "Crypto",
          url: "/dashboard/investments?action=add&type=crypto",
        },
        {
          title: "ETF",
          url: "/dashboard/investments?action=add&type=etf",
        },
      ],
    },
    {
      title: "Add Expense",
      icon: IconCreditCard,
      url: "/dashboard/expenses?action=add",
      items: [
        {
          title: "Housing",
          url: "/dashboard/expenses?action=add&category=housing",
        },
        {
          title: "Food",
          url: "/dashboard/expenses?action=add&category=food",
        },
        {
          title: "Transportation",
          url: "/dashboard/expenses?action=add&category=transportation",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  reports: [
    {
      name: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartPie,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  
  const userData = session?.user ? {
    name: session.user.name || "User",
    email: session.user.email,
    avatar: session.user.image || "/codeguide-logo.png",
  } : {
    name: "Guest",
    email: "guest@example.com", 
    avatar: "/codeguide-logo.png",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                  <IconWallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-semibold">Claude Finance</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={staticData.navMain} />
        <NavDocuments items={staticData.navQuickActions} />
        <NavDocuments items={staticData.reports} />
        <NavSecondary items={staticData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
