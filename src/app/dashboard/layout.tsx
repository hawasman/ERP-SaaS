import { type Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import DashboardLayoutComnponent from "../_components/dashboard/layout-component";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        redirect('/sign-in')
        return <div>Not authenticated</div>
    }
    return (
        <DashboardLayoutComnponent>{children}</DashboardLayoutComnponent>
    )
}
