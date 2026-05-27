import { useEffect, useRef, useState } from "react"

import { cn } from "./utils/cn"
import { useTypingEngine } from "./core/engine/hooks/useTypingEngine"
import { useTypingSounds } from "./core/sounds/hooks/useTypingSounds"
import { createSentenceGenerator } from "./features/word/utils/sentenceGenerator"
import { getWordChars } from "./features/word/utils/utils"
import { Keyboard } from "./features/typing/components/Keyboard"
import { calculateTypingMetrics } from "./features/stats/utils/calculateTypingMetrics"
import { calculateKeyboardHeatmap } from "./features/typing/utils/calculateKeyboardHeatmap"
import { useReplay } from "./features/replay/hooks/useReplay"

const SPACE = "\u00A0"

export default function App() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const currentCharRef = useRef<HTMLSpanElement | null>(null)
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

    const [isReplayMode, setIsReplayMode] = useState(false)
    const { replayTyped, replayIndex } = useReplay({
        typed,
        isPlaying: isReplayMode,
    })
    const displayTyped = isReplayMode ? replayTyped : typed
    const displayIndex = isReplayMode ? replayIndex + 1 : currentIndex

    const elapsedMs = (duration - remainingTime) * 1000
    const metrics = isTimedOut
        ? calculateTypingMetrics({
              typed,
              elapsedMs,
          })
        : null
    const heatmap = calculateKeyboardHeatmap(typed)

    const shouldLoadMore = currentIndex > text.length * 0.8

    const keyboardMode = isReplayMode ? "live" : isTimedOut ? "heat" : "live"

    const replayLastInput =
        replayIndex >= 0
            ? {
                  code: replayTyped[replayIndex]?.code,
                  status: replayTyped[replayIndex]?.status,
              }
            : null
    const displayLastInput = isReplayMode ? replayLastInput : lastInput

    useEffect(() => {
        const initialSentences = generatorRef.current.nextBatch(4)
        setSentences(initialSentences)
    }, [])

    useEffect(() => {
        if (!shouldLoadMore) return

        const newSentences = generatorRef.current.nextBatch(4)
        setSentences((prev) => [...prev, ...newSentences])
    }, [shouldLoadMore])

    useEffect(() => {
        if (!currentCharRef.current) return

        currentCharRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }, [currentIndex])

    let globalIndex = 0

    return (
        <div className="flex flex-col gap-24 min-h-screen bg-black text-white">
            <div className="mt-8 max-w-4xl self-center">
                <div className="px-8 text-sm text-gray-400 mb-4 flex gap-4">
                    <span>Time: {remainingTime}s</span>
                    <span>Duration: {duration}s</span>

                    {isTimedOut && (
                        <span className="text-red-500">Finished</span>
                    )}
                </div>

                <div ref={containerRef} className="p-8 h-52 overflow-y-auto">
                    <div className="flex flex-wrap text-xl font-mono gap-1">
                        {words.map((word, wordIndex) => (
                            <div key={wordIndex} className="flex">
                                {word.map((char, charIndex) => {
                                    const typedChar = displayTyped[globalIndex]
                                    const currentCharIndex = globalIndex
                                    const isCurrentChar =
                                        currentCharIndex === displayIndex
                                    globalIndex++

                                    return (
                                        <span
                                            key={charIndex}
                                            ref={
                                                isCurrentChar
                                                    ? currentCharRef
                                                    : null
                                            }
                                            className={cn(
                                                "border-b-4 border-transparent transition-colors",

                                                currentCharIndex ===
                                                    displayIndex &&
                                                    "border-b-4 border-white",

                                                typedChar?.status ===
                                                    "correct" &&
                                                    "text-green-500",

                                                typedChar?.status ===
                                                    "incorrect" && char === " "
                                                    ? "bg-red-500/30"
                                                    : typedChar?.status ===
                                                        "incorrect"
                                                      ? "text-red-500"
                                                      : "",

                                                !typedChar &&
                                                    currentCharIndex !==
                                                        displayIndex &&
                                                    "text-gray-500",
                                            )}
                                        >
                                            {char === " " ? SPACE : char}
                                        </span>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isTimedOut && (
                <div>
                    <button
                        onClick={() => setIsReplayMode(true)}
                        className="rounded-lg border border-zinc-700 px-4 py-2"
                    >
                        Replay
                    </button>
                </div>
            )}

            <Keyboard
                lastInput={displayLastInput}
                heatmap={heatmap}
                mode={keyboardMode}
            />

            {metrics && (
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                        <div className="text-zinc-500">Raw WPM</div>
                        <div className="text-2xl font-semibold">
                            {metrics.rawWpm}
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                        <div className="text-zinc-500">Adjusted WPM</div>
                        <div className="text-2xl font-semibold">
                            {metrics.adjustedWpm}
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                        <div className="text-zinc-500">Accuracy</div>
                        <div className="text-2xl font-semibold">
                            {metrics.accuracy}%
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                        <div className="text-zinc-500">CPM</div>
                        <div className="text-2xl font-semibold">
                            {metrics.cpm}
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                        <div className="text-zinc-500">Error Rate</div>
                        <div className="text-2xl font-semibold">
                            {metrics.errorRate}%
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                        <div className="text-zinc-500">Characters</div>
                        <div className="text-2xl font-semibold">
                            {metrics.correctChars}/{metrics.totalTyped}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
