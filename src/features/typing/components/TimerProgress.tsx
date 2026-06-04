type TimerProgressProps = {
    duration: number
    remainingTime: number
    className?: string
    showLabel?: boolean
}

export default function TimerProgress({
    duration,
    remainingTime,
    className = "",
    showLabel = true,
}: TimerProgressProps) {
    const progress = Math.max(0, Math.min(1, remainingTime / duration))

    return (
        <div className={`flex items-center ${className}`}>
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden border border-white/5">
                <div
                    className="h-full bg-accent transition-[width] duration-200 ease-linear"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            {showLabel && (
                <span className="text-accent text-lg font-semibold w-12 text-right tabular-nums">
                    {remainingTime}
                </span>
            )}
        </div>
    )
}
