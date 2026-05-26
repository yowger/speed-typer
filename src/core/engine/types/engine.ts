export type TypedChar = {
    expected: string
    code: string
    typed: string
    status: "correct" | "incorrect"
    timestamp: number
}

export type LastInput = {
    code: string
    status: "correct" | "incorrect"
} | null
