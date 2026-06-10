import { cn } from "../../../utils/cn"

type TimerProgressProps = {
    remainingTime: number
    className?: string
}

export default function TimerProgress({
    remainingTime,
    className = "",
}: TimerProgressProps) {
    return (
        <span
            className={cn(
                `text-accent text-3xl font-semibold tabular-nums1`,
                className,
            )}
        >
            {remainingTime}
        </span>
    )
}
