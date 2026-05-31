import { useEffect, useRef, useState } from "react"

import type { LastInput, TypedChar } from "../types/engine"

type UseTypingEngineOptions = {
    enabled?: boolean
}

type UseTypingEngineReturn = {
    typed: TypedChar[]
    currentIndex: number
    lastInput: LastInput
    restart: () => void
}

export function useTypingEngine(
    text: string,
    options?: UseTypingEngineOptions,
): UseTypingEngineReturn {
    const { enabled = true } = options || {}
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typed, setTyped] = useState<TypedChar[]>([])
    const [lastInput, setLastInput] = useState<LastInput>(null)
    const sessionStartTimeRef = useRef<number | null>(null)

    const restart = () => {
        setCurrentIndex(0)
        setTyped([])
        setLastInput(null)
        sessionStartTimeRef.current = null
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
        if (!sessionStartTimeRef.current) {
            sessionStartTimeRef.current = performance.now()
        }

        const expectedChar = text[currentIndex]
        const isCorrect = key === expectedChar
        const timestamp = performance.now() - sessionStartTimeRef.current

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

    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (event: KeyboardEvent) => {
            const isBackspace = event.key === "Backspace"
            const isSpace = event.key === " "
            const isSpecial = event.key.length > 1 && !isSpace && !isBackspace

            if (isSpace || isBackspace) event.preventDefault()
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
    }, [currentIndex, enabled, text])

    return {
        typed,
        currentIndex,
        lastInput,
        restart,
    }
}
