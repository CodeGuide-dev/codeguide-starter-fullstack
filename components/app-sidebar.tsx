"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "@/lib/auth-client"
import {
  IconDashboard,
  IconCoin,
  IconTrendingUp,
  IconCreditCard,
  IconWallet,
  IconTarget,
  IconChartPie3,
  IconHelp,
  IconSearch,
  IconSettings,
  IconReportAnalytics,
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
      icon: IconCoin,
    },
  ],
  navClouds: [
    {
      title: "Goals",
      icon: IconTarget,
      isActive: false,
      url: "/dashboard/goals",
      items: [
        {
          title: "Active Goals",
          url: "/dashboard/goals/active",
        },
        {
          title: "Completed",
          url: "/dashboard/goals/completed",
        },
      ],
    },
    {
      title: "Analytics",
      icon: IconChartPie3,
      url: "/dashboard/analytics",
      items: [
        {
          title: "Net Worth Trends",
          url: "/dashboard/analytics/networth",
        },
        {
          title: "Cash Flow Analysis",
          url: "/dashboard/analytics/cashflow",
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
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Reports",
      url: "/dashboard/reports",
      icon: IconReportAnalytics,
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
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                  <IconCoin className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-semibold">Claude Finance</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={staticData.navMain} />
        <NavDocuments items={staticData.documents} />
        <NavSecondary items={staticData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
