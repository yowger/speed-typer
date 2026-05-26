export function calculateAccuracy(
    correctChars: number,
    totalTypedChars: number,
) {
    if (totalTypedChars === 0) return 100

    return Math.round((correctChars / totalTypedChars) * 100)
}
