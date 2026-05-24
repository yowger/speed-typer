import { cn } from "../../../utils/cn"

type KeyboardKeyState = "idle" | "active" | "correct" | "incorrect"

type KeyboardKeyProps = {
    label: string
    shiftLabel?: string
    state?: KeyboardKeyState
    wide?: boolean
}

export function KeyboardKey({
    label,
    shiftLabel,
    state = "idle",
    wide,
}: KeyboardKeyProps) {
    return (
        <div
            className={cn(
                "flex h-14 items-center justify-center rounded-md border transition-all duration-75 ease-out",
                wide ? "w-28" : "w-14",
                state === "idle" && "bg-zinc-900 border-zinc-700",
                state === "active" && "scale-95 bg-gray-700 border-gray-500",
                state === "correct" &&
                    "scale-95 bg-green-600/30 border-green-500 text-green-200",
                state === "incorrect" &&
                    "scale-95 bg-red-600/30 border-red-500 text-red-200",
            )}
        >
            <div className="flex flex-col items-center justify-center text-sm">
                {shiftLabel && (
                    <span className="text-[10px] text-gray-400">
                        {shiftLabel}
                    </span>
                )}

                <span>{label}</span>
            </div>
        </div>
    )
}
