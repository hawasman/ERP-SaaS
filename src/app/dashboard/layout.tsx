import { type Metadata } from "next";
import DashboardLayoutComnponent from "../_components/dashboard/layout-component";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <DashboardLayoutComnponent>{children}</DashboardLayoutComnponent>
    )
}
