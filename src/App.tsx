import { useEffect, useRef, useState } from "react"

import { cn } from "./utils/cn"
import { useTypingEngine } from "./core/engine/useTypingEngine"
import { useTypingSounds } from "./core/sounds/useTypingSounds"
import { createSentenceGenerator } from "./features/typing/sentenceGenerator"
import { getWordChars } from "./features/typing/utils"

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
        mistakes,
        accuracy,
        wpm,
        lastInput,
        remainingTime,
        duration,
        isTimedOut,
    } = useTypingEngine(text, 120)

    useTypingSounds(lastInput)

    const shouldLoadMore = currentIndex > text.length * 0.8

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
        <div className="flex min-h-screen bg-black text-white">
            <div className="mt-8 max-w-4xl">
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
                                    const typedChar = typed[globalIndex]
                                    const currentCharIndex = globalIndex
                                    const isCurrentChar =
                                        currentCharIndex === currentIndex
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
                                                    currentIndex &&
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
                                                        currentIndex &&
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

                <div className="mt-4 flex items-center gap-4">
                    <div className="px-8 text-sm text-gray-400">
                        Mistakes: {mistakes}
                    </div>

                    <div className="px-8 text-sm text-gray-400">
                        Accuracy: {accuracy}%
                    </div>

                    <div className="px-8 text-sm text-gray-400">WPM: {wpm}</div>
                </div>
            </div>
        </div>
    )
}
