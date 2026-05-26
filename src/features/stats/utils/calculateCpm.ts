export function calculateCpm(totalTypedChars: number, elapsedMinutes: number) {
    if (elapsedMinutes <= 0) return 0

    return Math.round(totalTypedChars / elapsedMinutes)
}
