import { type KeyEvent } from "../../../core/engine/types/engine"
import { calculateAccuracy } from "../utils/calculateAccuracy"
import { calculateAdjustedWpm } from "../utils/calculateAdjustedWpm"
import { calculateRawWpm } from "../utils/calculateRawWpm"

export type MetricHistoryPoint = {
    second: number
    rawWpm: number
    adjustedWpm: number
    accuracy: number
}

export function generateMetricHistory(
    keyEvents: KeyEvent[],
): MetricHistoryPoint[] {
    const inputEvents = keyEvents.filter(
        (e): e is Extract<KeyEvent, { type: "input" }> => e.type === "input",
    )

    if (inputEvents.length === 0) {
        return []
    }

    const startTime = inputEvents[0].timestamp

    const lastTime = inputEvents[inputEvents.length - 1].timestamp

    const totalSeconds = Math.ceil((lastTime - startTime) / 1000)

    const history: MetricHistoryPoint[] = []

    for (let second = 1; second <= totalSeconds; second++) {
        const cutoff = startTime + second * 1000

        const eventsUntilNow = inputEvents.filter((e) => e.timestamp <= cutoff)

        const totalTyped = eventsUntilNow.length

        const correctChars = eventsUntilNow.filter(
            (e) => e.status === "correct",
        ).length

        const minutes = second / 60

        history.push({
            second,
            rawWpm: calculateRawWpm(totalTyped, minutes),
            adjustedWpm: calculateAdjustedWpm(correctChars, minutes),
            accuracy: calculateAccuracy(correctChars, totalTyped),
        })
    }

    return history
}
