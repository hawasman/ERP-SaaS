'use client'
import { Slash } from "lucide-react"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"

export const NavBreadcrumb = () => {
    const [breadcrumb, setBreadcrumb] = useState<string[]>([])
    const pathname = usePathname()

    useEffect(() => {
        const path = pathname.split('/').slice(1).map(item => item.charAt(0).toUpperCase() + item.slice(1));
        setBreadcrumb(path);
    }, [pathname]);
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumb.map((item, index) => (
                        <React.Fragment key={index}>
                            {index < breadcrumb.length - 1 ? (
                                <BreadcrumbItem key={index} className="hidden md:block">
                                    <BreadcrumbLink href={`/${breadcrumb.slice(0, index + 1).join('/').toLocaleLowerCase()}`}>
                                        {item}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            ) : (
                                <BreadcrumbItem key={index}>
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
        </header>
    )
}