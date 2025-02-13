"use client"

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react"
import { useSession } from "~/client/auth-client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { signOut } from "~/server/actions/auth-actions"
import { Loader } from "../loader"

export function NavUser({ compact = false }) {
    // const { isMobile } = useSidebar()
    const { data, isPending } = useSession()
    const user = data?.user;
    const initials = user?.name.match(/(^\S\S?|\s\S)?/g)?.map(v => v.trim()).join("").match(/(^\S|\S$)?/g)?.join("").toLocaleUpperCase()

    if (isPending) {
        return (
            <Loader />
        )
    }

    if (!user) {
        return (
            <div>
                <Link href={"/sign-in"} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all">
                    Get Started
                </Link>
            </div>
        )
    }

    if (compact) {
        return <Link href="/dashboard">
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image ?? "#"} alt={user.name} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
        </Link>
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"ghost"}
                    size="lg"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.image ?? "#"} alt={user.name} />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    {!compact && (
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user.name}</span>
                            <span className="truncate text-xs">{user.email}</span>
                        </div>
                    )}
                    <ChevronsUpDown className="ml-auto size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.image ?? "#"} alt={user.name} />
                            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user.name}</span>
                            <span className="truncate text-xs">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkles />
                        Upgrade to Pro
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BadgeCheck />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    signOut()
                }}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

