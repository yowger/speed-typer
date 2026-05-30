import { useEffect, useReducer } from "react"

import { useTypingEngine } from "./useTypingEngine"
import { useCountdown } from "./useCountdown"
import { sessionReducer } from "../sessionReducer"
import { useGenerateText } from "./useGenerateText"

export default function useTypingSession() {
    const [session, dispatch] = useReducer(sessionReducer, {
        mode: "idle",
    })
    const textSystem = useGenerateText()
    const engine = useTypingEngine(textSystem.text)
    const timer = useCountdown(30)

    const text = textSystem.text
    const textLength = text.length

    const shouldLoadMore = engine.currentIndex > textLength * 0.8

    const isFirstInput = engine.currentIndex === 1 && session.mode === "idle"
    const isFinished = engine.currentIndex >= textLength || timer.isExpired

    const startReplay = () => {
        dispatch({ type: "REPLAY" })

        timer.stop()
    }

    const resetSession = () => {
        dispatch({ type: "RESET" })

        engine.restart()
        timer.restart()
        textSystem.reset()
    }

    useEffect(() => {
        if (shouldLoadMore) {
            textSystem.loadMore(engine.currentIndex)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldLoadMore])

    useEffect(() => {
        if (isFirstInput) {
            dispatch({ type: "START_TYPING" })
            timer.start()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [engine.currentIndex, timer])

    useEffect(() => {
        if (isFinished && session.mode !== "results") {
            dispatch({ type: "FINISH" })
            timer.stop()
        }
    }, [isFinished, session.mode, timer])

    useEffect(() => {
        if (timer.isExpired) {
            dispatch({ type: "TIME_UP" })
        }
    }, [timer.isExpired])

    return {
        typed: engine.typed,
        currentIndex: engine.currentIndex,
        lastInput: engine.lastInput,
        words: textSystem.words,
        text,
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
