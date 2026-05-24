export function createSeededRandom(seed: number) {
    return function () {
        seed = (seed * 1664525 + 1013904223) % 4294967296
        return seed / 4294967296
    }
}

export function getWordChars(text: string) {
    return text.split(" ").map((word, index, array) => {
        const chars = word.split("")
        if (index !== array.length - 1) {
            chars.push(" ")
        }
        return chars
    })
}
