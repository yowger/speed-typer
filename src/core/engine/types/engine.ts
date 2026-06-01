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

export type KeyEvent =
    | {
          type: "input"
          expected: string
          code: string
          typed: string
          status: "correct" | "incorrect"
          timestamp: number
      }
    | {
          type: "backspace"
          code: "Backspace"
          timestamp: number
      }
