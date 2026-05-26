export function calculateRawWpm(
    totalTypedChars: number,
    elapsedMinutes: number,
) {
    if (elapsedMinutes <= 0) return 0

    return Math.round(totalTypedChars / 5 / elapsedMinutes)
}
