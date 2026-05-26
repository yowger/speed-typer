import { useEffect, useMemo, useRef, useState } from "react"

export type TypedChar = {
    expected: string
    code: string
    typed: string
    status: "correct" | "incorrect"
    timestamp: number
}

export type LastInput = {
    code: string
    status: "correct" | "incorrect"
} | null

type UseTypingEngineReturn = {
    typed: TypedChar[]
    currentIndex: number
    mistakes: number
    accuracy: number
    wpm: number
    lastInput: LastInput
    restart: () => void
    duration: number
    remainingTime: number
    isTimedOut: boolean
}

export function useTypingEngine(
    text: string,
    duration: number = 30,
): UseTypingEngineReturn {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typed, setTyped] = useState<TypedChar[]>([])
    const [lastInput, setLastInput] = useState<LastInput>(null)
    const [remainingTime, setRemainingTime] = useState(duration)
    const [started, setStarted] = useState(false)
    const sessionStartTimeRef = useRef<number | null>(null)

    const mistakes = typed.filter((t) => t.status === "incorrect").length
    const isTimedOut = remainingTime <= 0

    useEffect(() => {
        if (!started || isTimedOut) return

        const interval = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [started, isTimedOut])

    const accuracy = useMemo(() => {
        if (typed.length === 0) return 100
        return Math.round(((typed.length - mistakes) / typed.length) * 100)
    }, [typed.length, mistakes])

    const wpm = useMemo(() => {
        const minutes = (duration - remainingTime) / 60
        if (minutes <= 0) return 0

        const wordsTyped = typed.length / 5
        return Math.round(wordsTyped / minutes)
    }, [typed.length, remainingTime, duration])

    const restart = () => {
        setCurrentIndex(0)
        setTyped([])
        setLastInput(null)
        setRemainingTime(duration)
        setStarted(false)
    }

    const handleBackspace = () => {
        if (currentIndex === 0) return

        setTyped((prev) => prev.slice(0, -1))
        setCurrentIndex((prev) => Math.max(prev - 1, 0))

        setLastInput({
            code: "Backspace",
            status: "correct",
        })
    }

    const handleCharacterInput = (key: string, code: string) => {
        if (!started) {
            setStarted(true)
            sessionStartTimeRef.current = performance.now()
        }

        const expectedChar = text[currentIndex]
        const isCorrect = key === expectedChar
        const timestamp = performance.now() - (sessionStartTimeRef.current ?? 0)

        const nextChar: TypedChar = {
            expected: expectedChar,
            typed: key,
            status: isCorrect ? "correct" : "incorrect",
            code: code,
            timestamp,
        }

        setTyped((prev) => [...prev, nextChar])

        setCurrentIndex((prev) => prev + 1)

        setLastInput({
            code,
            status: nextChar.status,
        })
    }

    const isFinished = isTimedOut || currentIndex >= text.length

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isBackspace = event.key === "Backspace"
            const isSpace = event.key === " "
            const isSpecial = event.key.length > 1 && !isSpace && !isBackspace

            if (isSpace || isBackspace) event.preventDefault()
            if (isFinished) return
            if (isSpecial) return

            if (isBackspace) {
                handleBackspace()
                return
            }

            handleCharacterInput(event.key, event.code)
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => window.removeEventListener("keydown", handleKeyDown)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, isFinished, text])

    return {
        typed,
        currentIndex,
        mistakes,
        accuracy,
        wpm,
        lastInput,
        restart,
        duration,
        remainingTime,
        isTimedOut,
    }
}
