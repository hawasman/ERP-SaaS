import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex gap-4">
            {children}
        </div>
    );
}
