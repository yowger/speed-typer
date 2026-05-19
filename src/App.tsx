import { useEffect, useState } from "react"

import { cn } from "./utils/cn"

const text =
    "Biology explores the living world, covering organisms' structure, function, and evolution, with genetics and ecology being key areas. Modern tools like CRISPR allow for gene manipulation, while ecology examines environmental interactions. Biology's applications include medicine, agriculture, and conservation, making it essential for understanding life and addressing global challenges."

type CharState = {
    char: string
    status: "correct" | "incorrect"
}

export default function App() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typed, setTyped] = useState<CharState[]>([])
    // const [startedAt, setStartedAt] = useState<number | null>(null)
    const [mistakes, setMistakes] = useState(0)
    console.log("mistakes: ", mistakes)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
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

            if (event.key === text[currentIndex]) {
                setCurrentIndex((prevIndex) => prevIndex + 1)
            }

            console.log("Key pressed:", event.key, "Expected:", expectedChar)
            console.log("typed: ", typed)
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex])

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-2xl font-mono p-8">
                {text.split("").map((char, index) => {
                    const typedChar = typed[index]

                    return (
                        <span
                            className={cn(
                                index === currentIndex && "border-b",

                                typedChar?.status === "correct" &&
                                    "text-green-500",

                                typedChar?.status === "incorrect" &&
                                    "text-red-500",

                                !typedChar &&
                                    index !== currentIndex &&
                                    "text-gray-500",
                            )}
                            key={index}
                        >
                            {char}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
