export function calculateAdjustedWpm(
    correctChars: number,
    elapsedMinutes: number,
) {
    if (elapsedMinutes <= 0) return 0

    return Math.round(correctChars / 5 / elapsedMinutes)
}
