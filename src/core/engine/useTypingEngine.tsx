import { useEffect, useMemo, useState } from "react"

export type CharState = {
    expected: string
    typed: string
    status: "correct" | "incorrect"
}

export type LastInput = {
    key: string
    status: "correct" | "incorrect"
} | null

type UseTypingEngineReturn = {
    typed: CharState[]
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
    const [typed, setTyped] = useState<CharState[]>([])
    const [mistakes, setMistakes] = useState(0)
    const [lastInput, setLastInput] = useState<LastInput>(null)
    const [remainingTime, setRemainingTime] = useState(duration)
    const [started, setStarted] = useState(false)

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
        setMistakes(0)
        setLastInput(null)
        setRemainingTime(duration)
        setStarted(false)
    }

    const handleBackspace = () => {
        if (currentIndex === 0) return

        const lastTyped = typed[currentIndex - 1]

        if (lastTyped?.status === "incorrect") {
            setMistakes((prev) => Math.max(prev - 1, 0))
        }

        setTyped((prev) => prev.slice(0, -1))
        setCurrentIndex((prev) => Math.max(prev - 1, 0))

        setLastInput({
            key: "Backspace",
            status: "correct",
        })
    }

    const handleCharacterInput = (key: string) => {
        if (!started) setStarted(true)

        const expectedChar = text[currentIndex]
        const isCorrect = key === expectedChar

        const nextChar: CharState = {
            expected: expectedChar,
            typed: key,
            status: isCorrect ? "correct" : "incorrect",
        }

        setTyped((prev) => [...prev, nextChar])

        if (!isCorrect) {
            setMistakes((prev) => prev + 1)
        }

        setCurrentIndex((prev) => prev + 1)

        setLastInput({
            key,
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

            handleCharacterInput(event.key)
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => window.removeEventListener("keydown", handleKeyDown)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, isFinished, text, typed])

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
