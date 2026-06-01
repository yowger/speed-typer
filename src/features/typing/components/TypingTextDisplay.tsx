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

    const flatChars = words.flat()

    return (
        <div className="p-8 h-52 overflow-y-auto">
            <div className="flex flex-wrap text-xl font-mono gap-1">
                {flatChars.map((char, index) => {
                    const typedChar = displayTyped[index]
                    const isCurrentChar = index === displayIndex

                    return (
                        <span
                            key={index}
                            ref={isCurrentChar ? currentCharRef : null}
                            className={cn(
                                "border-b-4 border-transparent transition-colors",

                                isCurrentChar && "border-b-4 border-white",

                                typedChar?.status === "correct" &&
                                    "text-green-500",

                                typedChar?.status === "incorrect" &&
                                    char === " "
                                    ? "bg-red-500/30"
                                    : typedChar?.status === "incorrect"
                                      ? "text-red-500"
                                      : "",

                                !typedChar && !isCurrentChar && "text-gray-500",
                            )}
                        >
                            {char === " " ? SPACE : char}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
