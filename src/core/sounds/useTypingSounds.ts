import { useEffect } from "react"

import type { LastInput } from "../engine/useTypingEngine"

import { backspaceSound, errorSound, keySound, spaceSound } from "./sounds"

export function useTypingSounds(lastInput: LastInput) {
    useEffect(() => {
        if (!lastInput) return

        const randomRate = 0.95 + Math.random() * 0.1

        if (lastInput.key === "Backspace") {
            backspaceSound.rate(randomRate)
            backspaceSound.play()

            return
        }

        if (lastInput.key === " ") {
            spaceSound.rate(randomRate)
            spaceSound.play()

            return
        }

        if (lastInput.status === "incorrect") {
            errorSound.rate(randomRate)
            errorSound.play()

            return
        }

        keySound.rate(randomRate)
        keySound.play()
    }, [lastInput])
}
