import { UserIcon } from "lucide-react"

export default function Navbar() {
    const user = false

    return (
        <header className="border-b border-border">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <h1 className="font-semibold tracking-tight">SpeedTyper</h1>
                </div>

                <nav className="flex items-center gap-6 text-sm text-muted">
                    <button className="transition-colors hover:text-foreground">
                        Test
                    </button>

                    <button className="transition-colors hover:text-foreground">
                        Leaderboard
                    </button>

                    <button className="transition-colors hover:text-foreground">
                        About
                    </button>
                </nav>

                <div className="flex items-center gap-3">
                    {user ? (
                        <button className="flex items-center gap-2 rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface hover:text-foreground">
                            <UserIcon className="h-4 w-4" />
                            <span>{user}</span>
                        </button>
                    ) : (
                        <>
                            <button className="text-sm text-muted transition-colors hover:text-foreground">
                                Login
                            </button>

                            <button className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                                Create Account
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
