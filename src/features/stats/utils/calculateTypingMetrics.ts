import { calculateAccuracy } from "./calculateAccuracy"
import { calculateAdjustedWpm } from "./calculateAdjustedWpm"
import { calculateCpm } from "./calculateCpm"
import { calculateErrorRate } from "./calculateErrorRate"
import { calculateRawWpm } from "./calculateRawWpm"

import type { KeyEvent } from "../../../core/engine/types/engine"

type Params = {
    keyEvents: KeyEvent[]
    elapsedMs: number
}

export type TypingMetricsReturn = {
    rawWpm: number
    adjustedWpm: number
    accuracy: number
    cpm: number
    errorRate: number
    totalTyped: number
    correctChars: number
    incorrectChars: number
}

export function calculateTypingMetrics({
    keyEvents,
    elapsedMs,
}: Params): TypingMetricsReturn {
    const inputEvents = keyEvents.filter(
        (e): e is Extract<KeyEvent, { type: "input" }> => e.type === "input",
    )

    const totalTyped = inputEvents.length

    const correctChars = inputEvents.filter(
        (e) => e.status === "correct",
    ).length

    const incorrectChars = inputEvents.filter(
        (e) => e.status === "incorrect",
    ).length

    const minutes = elapsedMs / 1000 / 60

    if (minutes <= 0) {
        return {
            rawWpm: 0,
            adjustedWpm: 0,
            accuracy: 100,
            cpm: 0,
            errorRate: 0,
            totalTyped: 0,
            correctChars: 0,
            incorrectChars: 0,
        }
    }

    const rawWpm = calculateRawWpm(totalTyped, minutes)
    const adjustedWpm = calculateAdjustedWpm(correctChars, minutes)
    const cpm = calculateCpm(totalTyped, minutes)
    const accuracy = calculateAccuracy(correctChars, totalTyped)
    const errorRate = calculateErrorRate(incorrectChars, totalTyped)

    return {
        rawWpm,
        adjustedWpm,
        accuracy,
        cpm,
        errorRate,
        totalTyped,
        correctChars,
        incorrectChars,
    }
}
