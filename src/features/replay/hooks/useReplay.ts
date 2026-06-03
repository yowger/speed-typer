import { useEffect, useRef, useState } from "react"

import type { KeyEvent } from "../../../core/engine/types/engine"

type Params = {
    keyEvents: KeyEvent[]
    replayId: number
}

type ReplayTypedChar = Extract<KeyEvent, { type: "input" }>

export function useReplay({ keyEvents, replayId }: Params) {
    const [replayTyped, setReplayTyped] = useState<ReplayTypedChar[]>([])
    const [replayIndex, setReplayIndex] = useState(-1)

    const timeoutsRef = useRef<number[]>([])

    useEffect(() => {
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []

        const setReplay = () => {
            setReplayTyped([])
            setReplayIndex(-1)
        }
        setReplay()

        if (keyEvents.length === 0) return

        const startTime = keyEvents[0].timestamp

        let state: ReplayTypedChar[] = []

        keyEvents.forEach((event, index) => {
            const delay = event.timestamp - startTime

            const timeout = window.setTimeout(() => {
                if (event.type === "input") {
                    state = [...state, event]
                }

                if (event.type === "backspace") {
                    state = state.slice(0, -1)
                }

                setReplayTyped(state)
                setReplayIndex(index)
            }, delay)

            timeoutsRef.current.push(timeout)
        })

        return () => {
            timeoutsRef.current.forEach(clearTimeout)
        }
    }, [keyEvents, replayId])

    return {
        replayTyped,
        replayIndex,
    }
}

// TODO FIX REPLAY. jumpy.