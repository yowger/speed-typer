import { cn } from "../../../utils/cn"

type KeyboardKeyState = "idle" | "active" | "correct" | "incorrect"
type HeatLevel = "none" | "low" | "medium" | "high"
type KeyboardMode = "live" | "heat"

type KeyboardKeyProps = {
    label: string
    shiftLabel?: string
    state?: KeyboardKeyState
    heat?: HeatLevel
    presses?: number
    mode?: KeyboardMode
    wide?: boolean
    extraWide?: boolean
}

export function KeyboardKey({
    label,
    shiftLabel,
    state = "idle",
    heat = "none",
    presses,
    mode = "live",
    wide,
    extraWide,
}: KeyboardKeyProps) {
    const base =
        "relative flex h-11 items-center justify-center rounded-md border transition-all duration-300 ease-out select-none"

    const size = extraWide ? "w-52" : wide ? "w-20" : "w-11"

    const stateStyle =
        mode === "live"
            ? state === "active"
                ? "scale-95 bg-gray-700 border-gray-500"
                : state === "correct"
                  ? "scale-95 bg-green-600/30 border-green-500 text-green-200"
                  : state === "incorrect"
                    ? "scale-95 bg-red-600/30 border-red-500 text-red-200"
                    : "bg-zinc-900 border-zinc-700"
            : ""

    const heatStyle =
        mode === "heat"
            ? heat === "high"
                ? "bg-red-500/75 border-orange-500"
                : heat === "medium"
                  ? "bg-orange-500/50 border-orange-400"
                  : heat === "low"
                    ? "bg-orange-500/30 border-orange-300"
                    : "bg-zinc-900 border-zinc-700"
            : ""

    return (
        <div className={cn(base, size, stateStyle || heatStyle)}>
            <div className="flex flex-col items-center justify-center leading-none">
                {shiftLabel && (
                    <span className="text-sm font-semibold text-gray-400">
                        {shiftLabel}
                    </span>
                )}

                <span className="text-sm font-semibold">{label}</span>

                {mode === "heat" && presses !== undefined && (
                    <span className="text-[10px] font-semibold text-gray-400 absolute right-1 bottom-1">
                        {presses}
                    </span>
                )}
            </div>
        </div>
    )
}
