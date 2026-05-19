import { useEffect, useState } from "react"

import { cn } from "./utils/cn"

const text = "the quick brown fox jumps over the lazy dog"

type CharState = {
    char: string
    status: "correct" | "incorrect" | "pending"
}

export default function App() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === text[currentIndex]) {
                console.log("Correct key pressed:", event.key)
                setCurrentIndex((prevIndex) => prevIndex + 1)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentIndex])

    return (
        <div>
            {text.split("").map((char, index) => (
                <span
                    className={cn(
                        index === currentIndex ? "bg-white text-black" : "",
                    )}
                    key={index}
                >
                    {char}
                </span>
            ))}
        </div>
    )
}
