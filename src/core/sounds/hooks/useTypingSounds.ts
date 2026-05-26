import { useEffect } from "react"

import { backspaceSound, errorSound, keySound, spaceSound } from "../sounds"
import type { LastInput } from "../../engine/types/engine"

export function useTypingSounds(lastInput: LastInput) {
    useEffect(() => {
        if (!lastInput) return

        const randomRate = 0.95 + Math.random() * 0.1

        if (lastInput.code === "Backspace") {
            backspaceSound.rate(randomRate)
            backspaceSound.play()

            return
        }

        if (lastInput.code === " ") {
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
