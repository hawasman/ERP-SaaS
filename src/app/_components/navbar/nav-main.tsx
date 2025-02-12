"use client"

import { Bot, ChevronRight, Frame, Map, PieChart, Settings2, SquareTerminal } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "~/components/ui/sidebar"


const data = {
    navMain: [
        {
            title: "Dashoard",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/dashboard",
                },
                {
                    title: "Report 2",
                    url: "#",
                },
                {
                    title: "Report 3",
                    url: "#",
                },
            ],
        },
        {
            title: "Employee Managment",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Employees",
                    url: "/dashboard/employees",
                },
                {
                    title: "Salaries",
                    url: "#",
                },
                {
                    title: "Leave & Vecations",
                    url: "#",
                },
            ],
        },
        {
            title: "Finance",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Sales",
                    url: "/dashboard/sales",
                },
                {
                    title: "Orders",
                    url: "#",
                },
                {
                    title: "Transactions",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function NavMain() {
    const items = data.navMain
    return (
        <SidebarGroup>
            {/* <SidebarGroupLabel>Erp</SidebarGroupLabel> */}
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

