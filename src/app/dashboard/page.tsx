import { headers } from "next/headers"
import { auth } from "~/server/auth"
import { DashboardIndex } from "../_components/dashboard-index"

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return <div>Not authenticated</div>
    }
    return (
        <DashboardIndex />
    )
}