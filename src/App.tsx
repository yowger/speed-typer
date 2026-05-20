import { useEffect, useState } from "react"
import { Howl } from "howler"

import { cn } from "./utils/cn"

const keySound1 = new Howl({
    src: ["/assets/sounds/key_press_1.mp3"],
    volume: 0.15,
})
const spaceKeySound = new Howl({
    src: ["/assets/sounds/space_key.mp3"],
    volume: 0.15,
})

const text =
    "Biology explores the living world, covering organisms' structure, function, and evolution, with genetics and ecology being key areas. Modern tools like CRISPR allow for gene manipulation, while ecology examines environmental interactions. Biology's applications include medicine, agriculture, and conservation, making it essential for understanding life and addressing global challenges."

const words = text.split(" ").map((word, index, array) => {
    const chars = word.split("")

    if (index !== array.length - 1) {
        chars.push(" ")
    }

    return chars
})

const SPACE = "\u00A0"

type CharState = {
    expected: string
    char: string
    status: "correct" | "incorrect"
}

export default function App() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typed, setTyped] = useState<CharState[]>([])
    const [mistakes, setMistakes] = useState(0)

    const accuracy =
        typed.length > 0
            ? Math.round(((typed.length - mistakes) / typed.length) * 100)
            : 100

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            keySound1.rate(0.95 + Math.random() * 0.1)
            keySound1.play()

            if (event.key === " ") {
                spaceKeySound.rate(0.95 + Math.random() * 0.1)
                spaceKeySound.play()
            }

            if (event.key === " " || event.key === "Backspace") {
                event.preventDefault()
            }

            if (currentIndex >= text.length) {
                return
            }

            if (event.key === "Backspace") {
                if (currentIndex === 0) return

                const lastTyped = typed[currentIndex - 1]

                if (lastTyped?.status === "incorrect") {
                    setMistakes((prev) => Math.max(prev - 1, 0))
                }

                setTyped((prev) => prev.slice(0, -1))
                setCurrentIndex((prev) => Math.max(prev - 1, 0))

                return
            }

            if (event.key.length > 1 && event.key !== " ") return

            const expectedChar = text[currentIndex]

            const isCorrect = event.key === expectedChar

            setTyped((prev) => [
                ...prev,
                {
                    expected: expectedChar,
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex])

    let globalIndex = 0

    return (
        <div className="flex min-h-screen bg-black text-white">
            <div className="max-w-4xl mt-8">
                <div className="flex gap-1 flex-wrap p-8 text-xl font-mono">
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
                                            "transition-colors border-b-2 border-transparent",

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
                    <div className="px-8 text-sm text-gray-400">
                        WPM:{" "}
                        {typed.length > 0 ? Math.round(typed.length / 5) : 0}
                    </div>
                </div>
            </div>
        </div>
    )
}
