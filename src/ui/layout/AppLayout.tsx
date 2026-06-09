import { Outlet } from "react-router"

import Navbar from "./navbar"

export default function AppLayout() {
    return (
        <div className="font-sans flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="mx-auto px-6 py-8 max-w-4xl flex flex-col gap-8">
                <Outlet />
            </main>
        </div>
    )
}
