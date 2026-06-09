import { useEffect, useState } from "react"

import { useTypingEngine } from "./useTypingEngine"
import { useCountdown } from "./useCountdown"
import { useGenerateText } from "./useGenerateText"
import { useSessionStateMachine } from "./useSessionStateMachine"

export default function useTypingSession() {
    const [typingEnabled, setTypingEnabled] = useState(true)
    const [typingDuration, setTypingDuration] = useState(30)

    const textSystem = useGenerateText()
    const engine = useTypingEngine(textSystem.text, { enabled: typingEnabled })
    const timer = useCountdown(typingDuration)

    const session = useSessionStateMachine({
        engine,
        timer,
        text: textSystem.text,
    })

    const pause = () => {
        setTypingEnabled(false)
        session.pause()
    }

    const resume = () => {
        setTypingEnabled(true)
        session.resume()
    }

    const resetSession = () => {
        engine.restart()
        timer.restart(timer.duration)
        textSystem.reset()
        session.reset()
    }

    const handleDurationChange = (value: number) => {
        setTypingDuration(value)

        engine.restart()
        timer.restart(value)
        textSystem.reset()
        session.reset()
    }

    useEffect(() => {
        textSystem.onProgress(engine.currentIndex)
    }, [engine.currentIndex, textSystem])

    useEffect(() => {
        if (session.mode === "typing" && !timer.isRunning) {
            timer.start()
        }

        if (
            (session.mode === "paused" || session.mode === "results") &&
            timer.isRunning
        ) {
            timer.stop()
        }
    }, [session.mode, timer])

    useEffect(() => {
        const setTypingMode = () => {
            if (session.mode === "idle" || session.mode === "typing") {
                setTypingEnabled(true)
            } else {
                setTypingEnabled(false)
            }
        }

        setTypingMode()
    }, [session.mode])

    console.log({
        textLength: textSystem.text.length,
        currentIndex: engine.currentIndex,
        mode: session.mode,
    })

    return {
        typed: engine.typed,
        keyEvents: engine.keyEvents,
        currentIndex: engine.currentIndex,
        lastInput: engine.lastInput,
        words: textSystem.words,
        text: textSystem.text,
        remainingTime: timer.remainingTime,
        duration: timer.duration,
        isTimedOut: timer.isExpired,
        mode: session.mode,
        isIdle: session.mode === "idle",
        isTyping: session.mode === "typing",
        isPaused: session.mode === "paused",
        isResults: session.mode === "results",
        pause,
        resume,
        resetSession,
        handleDurationChange,
    }
}
