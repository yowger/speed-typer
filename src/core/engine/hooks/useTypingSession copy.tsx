import { useEffect, useRef, useState } from "react"

import { createSentenceGenerator } from "../../../features/word/utils/sentenceGenerator"
import { useTypingEngine } from "./useTypingEngine"
import { useTypingSounds } from "../../sounds/hooks/useTypingSounds"
import { getWordChars } from "../../../features/word/utils/utils"

type Mode = "typing" | "results" | "replay"

export default function useTypingSession() {
    const globalIndex = 0

    const [mode, setMode] = useState<Mode>("typing")
    const generatorRef = useRef(createSentenceGenerator())
    const [sentences, setSentences] = useState<string[]>([])
    const words = getWordChars(sentences.join(" "))
    const text = sentences.join(" ")

    const {
        typed,
        currentIndex,
        lastInput,
        remainingTime,
        duration,
        isTimedOut,
    } = useTypingEngine(text, 30)

    useTypingSounds(lastInput)

    // const displayTyped = isReplayMode ? replayTyped : typed
    // const displayIndex = isReplayMode ? replayIndex + 1 : currentIndex

    const elapsedMs = (duration - remainingTime) * 1000

    const shouldLoadMore = currentIndex > text.length * 0.8

    // const replayLastInput =
    //     replayIndex >= 0
    //         ? {
    //               code: replayTyped[replayIndex]?.code,
    //               status: replayTyped[replayIndex]?.status,
    //           }
    //         : null
    // const displayLastInput = isReplayMode ? replayLastInput : lastInput

    useEffect(() => {
        const initialSentences = generatorRef.current.nextBatch(4)
        setSentences(initialSentences)
    }, [])

    useEffect(() => {
        if (!shouldLoadMore) return

        const newSentences = generatorRef.current.nextBatch(4)
        setSentences((prev) => [...prev, ...newSentences])
    }, [shouldLoadMore])

    // useEffect(() => {
    //     if (!currentCharRef.current) return

    //     currentCharRef.current.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center",
    //     })
    // }, [currentIndex])

    useEffect(() => {
        function setModeToResults() {
            if (isTimedOut) {
                setMode("results")
            }
        }

        setModeToResults()
    }, [isTimedOut])

    return {
        typed,
        words,
        globalIndex,
        currentIndex,
        elapsedMs,
        mode,
        lastInput,
    }
}
