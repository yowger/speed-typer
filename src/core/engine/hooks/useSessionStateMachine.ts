import { useEffect, useReducer } from "react"

import { sessionReducer } from "../sessionReducer"

type SessionInput = {
    engine: { currentIndex: number }
    timer: { isExpired: boolean }
    text: string
}

export function useSessionStateMachine({ engine, timer, text }: SessionInput) {
    const [state, dispatch] = useReducer(sessionReducer, {
        mode: "idle",
    })

    useEffect(() => {
        dispatch({
            type: "ENGINE_UPDATE",
            payload: {
                index: engine.currentIndex,
                textLength: text.length,
            },
        })
    }, [engine.currentIndex, text.length])

    useEffect(() => {
        dispatch({
            type: "TIMER_UPDATE",
            payload: {
                isExpired: timer.isExpired,
            },
        })
    }, [timer.isExpired])

    const replay = () => dispatch({ type: "REPLAY" })
    const reset = () => dispatch({ type: "RESET" })
    const pause = () => dispatch({ type: "PAUSE" })
    const resume = () => dispatch({ type: "RESUME" })

    return {
        mode: state.mode,
        dispatch,
        replay,
        reset,
        pause,
        resume,
    }
}
