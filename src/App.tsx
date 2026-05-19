import { useEffect, useState } from "react"

import { cn } from "./utils/cn"

const text =
    "Biology explores the living world, covering organisms' structure, function, and evolution, with genetics and ecology being key areas. Modern tools like CRISPR allow for gene manipulation, while ecology examines environmental interactions. Biology's applications include medicine, agriculture, and conservation, making it essential for understanding life and addressing global challenges."

const words = text.split(" ")

type CharState = {
    char: string
    status: "correct" | "incorrect"
}

export default function App() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typed, setTyped] = useState<CharState[]>([])
    const [mistakes, setMistakes] = useState(0)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.length > 1 && event.key !== " ") return

            const expectedChar = text[currentIndex]

            const isCorrect = event.key === expectedChar

            setTyped((prev) => [
                ...prev,
                {
                    char: event.key,
                    status: isCorrect ? "correct" : "incorrect",
                },
            ])

            if (!isCorrect) {
                setMistakes((prev) => prev + 1)
            }

            setCurrentIndex((prev) => prev + 1)
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentIndex])

    let globalIndex = 0

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="mt-20 max-w-4xl">
                <div className="flex flex-wrap gap-y-4 p-8 text-2xl font-mono leading-relaxed">
                    {words.map((word, wordIndex) => {
                        return (
                            <div key={wordIndex} className="flex">
                                {word.split("").map((char, charIndex) => {
                                    const typedChar = typed[globalIndex]

                                    const currentCharIndex = globalIndex

                                    globalIndex++

                                    return (
                                        <span
                                            key={charIndex}
                                            className={cn(
                                                "transition-colors border-b-2 border-transparent",

                                                currentCharIndex ===
                                                    currentIndex &&
                                                    "border-b-4 border-white",

                                                typedChar?.status ===
                                                    "correct" &&
                                                    "text-green-500",

                                                typedChar?.status ===
                                                    "incorrect" &&
                                                    "text-red-500",

                                                !typedChar &&
                                                    currentCharIndex !==
                                                        currentIndex &&
                                                    "text-gray-500",
                                            )}
                                        >
                                            {char}
                                        </span>
                                    )
                                })}

                                {wordIndex !== words.length - 1 &&
                                    (() => {
                                        const typedChar = typed[globalIndex]

                                        const currentCharIndex = globalIndex

                                        globalIndex++

                                        return (
                                            <span
                                                className={cn(
                                                    "w-4 transition-colors",

                                                    currentCharIndex ===
                                                        currentIndex &&
                                                        "border-b-2 border-white",

                                                    typedChar?.status ===
                                                        "correct" &&
                                                        "text-green-500",

                                                    typedChar?.status ===
                                                        "incorrect" &&
                                                        "bg-red-500/30",

                                                    !typedChar &&
                                                        currentCharIndex !==
                                                            currentIndex &&
                                                        "text-gray-500",
                                                )}
                                            >
                                                {" "}
                                            </span>
                                        )
                                    })()}
                            </div>
                        )
                    })}
                </div>

                <div className="px-8 text-sm text-gray-400">
                    Mistakes: {mistakes}
                </div>
            </div>
        </div>
    )
}
