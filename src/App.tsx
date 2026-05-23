import { cn } from "./utils/cn"
import { useTypingEngine } from "./core/engine/useTypingEngine"
import { useTypingSounds } from "./core/sounds/useTypingSounds"
import { createSentenceGenerator } from "./core/word_generator/sentenceGenerator"
import { useState } from "react"
import { getWordChars } from "./core/word_generator/utils"

const SPACE = "\u00A0"

export default function App() {
    const generator = createSentenceGenerator({ seed: 123 })
    const [sentences] = useState(() => generator.nextBatch(5))
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
    } = useTypingEngine(text, 30)

    useTypingSounds(lastInput)

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

                <div className="flex flex-wrap gap-1 p-8 font-mono text-xl">
                    {words.map((word, wordIndex) => (
                        <div key={wordIndex} className="flex">
                            {word.map((char, charIndex) => {
                                const typedChar = typed[globalIndex]
                                const currentCharIndex = globalIndex
                                globalIndex++

                                return (
                                    <span
                                        key={charIndex}
                                        className={cn(
                                            "border-b-2 border-transparent transition-colors",

                                            currentCharIndex === currentIndex &&
                                                "border-b-4 border-white",

                                            typedChar?.status === "correct" &&
                                                "text-green-500",

                                            typedChar?.status === "incorrect" &&
                                                char === " "
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
