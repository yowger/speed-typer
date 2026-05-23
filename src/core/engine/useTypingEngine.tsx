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
    isFinished: boolean
    lastInput: LastInput
}

export function useTypingEngine(text: string): UseTypingEngineReturn {
    const [currentIndex, setCurrentIndex] = useState(0)

    const [typed, setTyped] = useState<CharState[]>([])

    const [mistakes, setMistakes] = useState(0)

    const [lastInput, setLastInput] = useState<LastInput>(null)

    const isFinished = currentIndex >= text.length

    const accuracy = useMemo(() => {
        if (typed.length === 0) return 100

        return Math.round(((typed.length - mistakes) / typed.length) * 100)
    }, [typed.length, mistakes])

    const wpm = useMemo(() => {
        if (typed.length === 0) return 0

        return Math.round(typed.length / 5)
    }, [typed.length])

    useEffect(() => {
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

        const handleKeyDown = (event: KeyboardEvent) => {
            const isBackspace = event.key === "Backspace"

            const isSpace = event.key === " "

            const isSpecialKey =
                event.key.length > 1 && !isSpace && !isBackspace

            if (isSpace || isBackspace) {
                event.preventDefault()
            }

            if (isFinished) {
                return
            }

            if (isSpecialKey) {
                return
            }

            if (isBackspace) {
                handleBackspace()
                return
            }

            handleCharacterInput(event.key)
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentIndex, isFinished, text, typed])

    return {
        typed,
        currentIndex,
        mistakes,
        accuracy,
        wpm,
        isFinished,
        lastInput,
    }
}
