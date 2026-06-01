import { useEffect, useRef, useState } from "react"

export type TypedChar = {
    expected: string
    typed: string
    code: string
    status: "correct" | "incorrect"
    timestamp: number
}

type Params = {
    typed: TypedChar[]
    replayId: number
}

export function useReplay({ typed, replayId }: Params) {
    const [replayTyped, setReplayTyped] = useState<TypedChar[]>([])
    const [replayIndex, setReplayIndex] = useState(-1)

    const timeoutsRef = useRef<number[]>([])

    useEffect(() => {
        function clear() {
            timeoutsRef.current.forEach(clearTimeout)
            timeoutsRef.current = []
        }

        function reset() {
            setReplayTyped([])
            setReplayIndex(-1)
        }

        clear()
        reset()

        if (typed.length === 0) return

        typed.forEach((char, index) => {
            const timeout = window.setTimeout(() => {
                setReplayTyped((prev) => [...prev, char])
                setReplayIndex(index)
            }, char.timestamp)

            timeoutsRef.current.push(timeout)
        })

        return clear
    }, [typed, replayId])

    return {
        replayTyped,
        replayIndex,
    }
}
