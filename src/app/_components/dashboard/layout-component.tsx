import React from "react";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "../navbar/app-sidebar";
import { NavBreadcrumb } from "../navbar/nav-breadcrumb";

export default function DashboardLayoutComnponent({
    children,
}: Readonly<{ children: React.ReactNode }>) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavBreadcrumb />
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
