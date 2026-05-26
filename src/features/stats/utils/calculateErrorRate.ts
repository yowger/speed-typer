export function calculateErrorRate(mistakes: number, totalTypedChars: number) {
    if (totalTypedChars === 0) return 0

    return Math.round((mistakes / totalTypedChars) * 100)
}
