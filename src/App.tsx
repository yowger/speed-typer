import { cn } from "./utils/cn"
import { useTypingEngine } from "./core/engine/useTypingEngine"
import { useTypingSounds } from "./core/sounds/useTypingSounds"

const text =
    "Biology explores the living world, covering organisms' structure, function, and evolution."

const words = text.split(" ").map((word, index, array) => {
    const chars = word.split("")

    if (index !== array.length - 1) {
        chars.push(" ")
    }

    return chars
})

const SPACE = "\u00A0"

export default function App() {
    const { typed, currentIndex, mistakes, accuracy, wpm, lastInput } =
        useTypingEngine(text)

    useTypingSounds(lastInput)

    let globalIndex = 0

    return (
        <div className="flex min-h-screen bg-black text-white">
            <div className="mt-8 max-w-4xl">
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
                                                      "incorrect" &&
                                                      "text-red-500",

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
