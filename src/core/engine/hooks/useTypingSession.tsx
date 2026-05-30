import { useEffect } from "react"

import { useTypingEngine } from "./useTypingEngine"
import { useCountdown } from "./useCountdown"
import { useGenerateText } from "./useGenerateText"
import { useSessionStateMachine } from "./useSessionStateMachine"

export default function useTypingSession() {
    const textSystem = useGenerateText()
    const engine = useTypingEngine(textSystem.text)
    const timer = useCountdown(30)

    const session = useSessionStateMachine({
        engine,
        timer,
        text: textSystem.text,
    })

    const shouldLoadMore = engine.currentIndex > textSystem.text.length * 0.8

    useEffect(() => {
        if (shouldLoadMore) {
            textSystem.loadMore(engine.currentIndex)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldLoadMore])

    useEffect(() => {
        if (session.mode === "typing" && !timer.isRunning) {
            timer.start()
        }

        if (session.mode === "results" && timer.isRunning) {
            timer.stop()
        }
    }, [session.mode, timer])

    const startReplay = () => {
        session.replay()
        timer.stop()
    }

    const resetSession = () => {
        engine.restart()
        timer.restart()
        textSystem.reset()
        session.reset()
    }

    return {
        typed: engine.typed,
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
        isResults: session.mode === "results",
        isReplay: session.mode === "replay",
        startReplay,
        resetSession,
    }
}
