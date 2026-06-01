import { useEffect, useRef, useState } from "react"

import type { KeyEvent, LastInput, TypedChar } from "../types/engine"

type UseTypingEngineOptions = {
    enabled?: boolean
}

type UseTypingEngineReturn = {
    typed: TypedChar[]
    keyEvents: KeyEvent[]
    currentIndex: number
    lastInput: LastInput
    restart: () => void
}

export function useTypingEngine(
    text: string,
    options?: UseTypingEngineOptions,
): UseTypingEngineReturn {
    const { enabled = true } = options || {}

    const [keyEvents, setKeyEvents] = useState<KeyEvent[]>([])
    const [typed, setTyped] = useState<TypedChar[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lastInput, setLastInput] = useState<LastInput>(null)

    const sessionStartTimeRef = useRef<number | null>(null)

    const rebuildTyped = (events: KeyEvent[]): TypedChar[] => {
        const result: TypedChar[] = []

        for (const event of events) {
            if (event.type === "input") {
                result.push({
                    expected: event.expected,
                    typed: event.typed,
                    code: event.code,
                    status: event.status,
                    timestamp: event.timestamp,
                })
            }

            if (event.type === "backspace") {
                result.pop()
            }
        }

        return result
    }

    const restart = () => {
        setKeyEvents([])
        setTyped([])
        setCurrentIndex(0)
        setLastInput(null)
        sessionStartTimeRef.current = null
    }

    const handleBackspace = () => {
        if (currentIndex === 0) return

        const event: KeyEvent = {
            type: "backspace",
            code: "Backspace",
            timestamp: performance.now(),
        }

        setKeyEvents((prev) => {
            const next = [...prev, event]
            setTyped(rebuildTyped(next))
            return next
        })

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

        const event: KeyEvent = {
            type: "input",
            expected: expectedChar,
            typed: key,
            code,
            status: isCorrect ? "correct" : "incorrect",
            timestamp,
        }

        setKeyEvents((prev) => {
            const next = [...prev, event]
            setTyped(rebuildTyped(next))
            return next
        })

        setCurrentIndex((prev) => prev + 1)

        setLastInput({
            code,
            status: event.status,
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
        keyEvents: keyEvents,
        currentIndex,
        lastInput,
        restart,
    }
}
