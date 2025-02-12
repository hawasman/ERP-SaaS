'use client'
import { DollarSign, FileText, LayoutDashboard, Menu, Package, Search, Settings, ShoppingCart, Users, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { ToggleTheme } from "../toggle-theme";


export default function DashboardLayoutComnponent({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
    const navigation = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard/' },
        { icon: Users, label: 'Employees', to: '/dashboard/employees' },
        { icon: Package, label: 'Inventory', to: '/dashboard/inventory' },
        { icon: FileText, label: 'Documents', to: '/dashboard/documents' },
        { icon: ShoppingCart, label: 'Sales', to: '/dashboard/sales' },
        { icon: DollarSign, label: 'Finance', to: '/dashboard/finance' },
        { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
    ];

    // const { pathname } = useLocation();
    const pathname = window.location.pathname;

    // useEffect(() => {
    //     const path = pathname.split('/').slice(1).map(item => item.charAt(0).toUpperCase() + item.slice(1));
    //     setBreadcrumb(path);
    // }, [pathname]);

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed left-0 top-0 bottom-0 w-64 bg-card border-r p-4 z-50 transition-transform duration-200 lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between gap-2 mb-8">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6" />
                        <h1 className="font-bold text-xl">ERP System</h1>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.to}
                            className={cn(
                                "flex items-center gap-3 w-full p-2 rounded-lg transition-colors",
                                pathname === item.to
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-secondary"
                            )}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-background border-b">
                    <div className="flex items-center justify-between gap-2 m-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="relative w-full max-w-sm lg:w-96">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search..." className="pl-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <ToggleTheme />
                            {/* <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal" />
                            </SignedOut> */}
                        </div>
                    </div>
                </header>
                {/* <div className="p-4">
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList className="flex items-center space-x-1 text-sm">
                            {breadcrumb.map((item, index) => (
                                <React.Fragment key={index}>
                                    {index < breadcrumb.length - 1 ? (
                                        <BreadcrumbItem>
                                            <Link
                                                // @ts-ignore
                                                to={`/${breadcrumb.slice(0, index + 1).join('/')}`}
                                                className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                                            >
                                                {item}
                                            </Link>
                                        </BreadcrumbItem>
                                    ) : (
                                        <BreadcrumbItem>
                                            <BreadcrumbPage className="font-medium text-foreground">
                                                {item}
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    )}
                                    {index < breadcrumb.length - 1 && (
                                        <BreadcrumbSeparator className="text-muted-foreground/50">
                                            <Slash className="h-4 w-4" />
                                        </BreadcrumbSeparator>
                                    )}
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>

                </div> */}
                <main className="p-4">

                    {children}
                </main>

            </div>
        </div>
    );
}
