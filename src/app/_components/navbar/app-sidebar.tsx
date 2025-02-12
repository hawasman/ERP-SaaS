import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
} from "~/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

