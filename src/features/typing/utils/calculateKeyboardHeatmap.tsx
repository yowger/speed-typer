import type { TypedChar } from "../../../core/engine/types/engine"

export type KeyHeat = {
    presses: number
    correct: number
    incorrect: number
}

export type KeyboardHeatmap = Record<string, KeyHeat>

export function calculateKeyboardHeatmap(typed: TypedChar[]): KeyboardHeatmap {
    return typed.reduce<KeyboardHeatmap>((acc, char) => {
        const key = char.code

        if (!acc[key]) {
            acc[key] = {
                presses: 0,
                correct: 0,
                incorrect: 0,
            }
        }

        acc[key].presses += 1

        if (char.status === "correct") {
            acc[key].correct += 1
        } else {
            acc[key].incorrect += 1
        }

        return acc
    }, {})
}
