import { useEffect, useState } from "react"

export function useCountdown(duration: number) {
    const [remainingTime, setRemainingTime] = useState(duration)
    const [running, setRunning] = useState(false)

    useEffect(() => {
        if (!running || remainingTime <= 0) return

        const interval = setInterval(() => {
            setRemainingTime((prev) => Math.max(prev - 1, 0))
        }, 1000)

        return () => clearInterval(interval)
    }, [running, remainingTime])

    const start = () => setRunning(true)

    const stop = () => setRunning(false)

    const restart = () => {
        setRemainingTime(duration)
        setRunning(false)
    }

    return {
        duration,
        remainingTime,
        isExpired: remainingTime <= 0,
        start,
        stop,
        restart,
    }
}
