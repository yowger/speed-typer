import { useEffect, useState, useCallback } from "react"

export function useCountdown(duration: number) {
    const [remainingTime, setRemainingTime] = useState(duration)
    const [running, setRunning] = useState(false)

    const isExpired = remainingTime <= 0

    useEffect(() => {
        if (!running || isExpired) return

        const interval = setInterval(() => {
            setRemainingTime((prev) => Math.max(prev - 1, 0))
        }, 1000)

        return () => clearInterval(interval)
    }, [running, isExpired])

    const start = useCallback(() => {
        setRunning(true)
    }, [])

    const stop = useCallback(() => {
        setRunning(false)
    }, [])

    const restart = useCallback(() => {
        setRemainingTime(duration)
        setRunning(false)
    }, [duration])

    useEffect(() => {
        const setTime = () => setRemainingTime(duration)

        setTime()
    }, [duration])

    return {
        duration,
        remainingTime,
        isExpired,
        isRunning: running,
        start,
        stop,
        restart,
    }
}
