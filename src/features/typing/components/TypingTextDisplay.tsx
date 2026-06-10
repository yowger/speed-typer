import { useEffect, useRef } from "react"

import { cn } from "../../../utils/cn"

type TypingTextDisplayProps = {
    displayIndex: number
    displayTyped: { code: string; status: "correct" | "incorrect" }[]
    words: string[][]
}

const SPACE = "\u00A0"

export default function TypingTextDisplay({
    displayIndex,
    displayTyped,
    words,
}: TypingTextDisplayProps) {
    const currentCharRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        if (!currentCharRef.current) return

        currentCharRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }, [displayIndex])

    let globalIndex = 0

    return (
        <div className="overflow-y-auto h-52 typing-scroll">
            <div className="flex flex-wrap text-lg md:text-xl font-mono leading gap-y-2">
                {words.map((word, wordIndex) => (
                    <div key={wordIndex} className="flex whitespace-nowrap">
                        {word.map((char, charIndex) => {
                            const index = globalIndex++

                            const typedChar = displayTyped[index]
                            const isCurrentChar = index === displayIndex

                            return (
                                <span
                                    key={charIndex}
                                    ref={isCurrentChar ? currentCharRef : null}
                                    className={cn(
                                        "border-b-3 border-transparent transition-colors",

                                        isCurrentChar &&
                                            "border-b-3 border-white",

                                        typedChar?.status === "correct" &&
                                            "text-white",

                                        typedChar?.status === "incorrect" &&
                                            char === " "
                                            ? "bg-red-500/30"
                                            : typedChar?.status === "incorrect"
                                              ? "text-red-500"
                                              : "",

                                        !typedChar &&
                                            !isCurrentChar &&
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
    )
}
