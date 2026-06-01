import type { KeyEvent } from "../../../core/engine/types/engine"

export type KeyHeat = {
    presses: number
    correct: number
    incorrect: number
}

export type KeyboardHeatmap = Record<string, KeyHeat>

export function calculateKeyboardHeatmap(
    keyEvents: KeyEvent[],
): KeyboardHeatmap {
    const inputEvents = keyEvents.filter(
        (e): e is Extract<KeyEvent, { type: "input" }> => e.type === "input",
    )

    return inputEvents.reduce<KeyboardHeatmap>((acc, event) => {
        const key = event.code

        if (!acc[key]) {
            acc[key] = {
                presses: 0,
                correct: 0,
                incorrect: 0,
            }
        }

        acc[key].presses += 1

        if (event.status === "correct") {
            acc[key].correct += 1
        } else {
            acc[key].incorrect += 1
        }

        return acc
    }, {})
}
