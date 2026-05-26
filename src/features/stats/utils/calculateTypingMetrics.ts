import { calculateAccuracy } from "./calculateAccuracy"
import { calculateAdjustedWpm } from "./calculateAdjustedWpm"
import { calculateCpm } from "./calculateCpm"
import { calculateErrorRate } from "./calculateErrorRate"
import { calculateRawWpm } from "./calculateRawWpm"

export type TypedChar = {
    expected: string
    typed: string
    status: "correct" | "incorrect"
    timestamp: number
}

type Params = {
    typed: TypedChar[]
    elapsedMs: number
}

export type TypingMetrics = {
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
    typed,
    elapsedMs,
}: Params): TypingMetrics {
    const totalTyped = typed.length

    const correctChars = typed.filter(
        (char) => char.status === "correct",
    ).length

    const incorrectChars = typed.filter(
        (char) => char.status === "incorrect",
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
