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
    isPlaying: boolean
}

export function useReplay({ typed, isPlaying }: Params) {
    const [replayTyped, setReplayTyped] = useState<TypedChar[]>([])
    const [replayIndex, setReplayIndex] = useState(0)
    const timeoutsRef = useRef<number[]>([])

    useEffect(() => {
        function clearPreviousReplay() {
            timeoutsRef.current.forEach(clearTimeout)
            timeoutsRef.current = []
        }

        function setReplay() {
            setReplayTyped([])
            setReplayIndex(0)
        }

        clearPreviousReplay()
        setReplay()

        if (!isPlaying) return
        if (typed.length === 0) return

        typed.forEach((char, index) => {
            const timeout = window.setTimeout(() => {
                setReplayTyped((prev) => [...prev, char])
                setReplayIndex(index)
            }, char.timestamp)

            timeoutsRef.current.push(timeout)
        })

        return () => {
            timeoutsRef.current.forEach(clearTimeout)
        }
    }, [typed, isPlaying])

    return {
        replayTyped,
        replayIndex,
    }
}
