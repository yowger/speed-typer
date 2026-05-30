type State = {
    mode: "idle" | "typing" | "results" | "replay"
}

type Action =
    | { type: "ENGINE_UPDATE"; payload: { index: number; textLength: number } }
    | { type: "TIMER_UPDATE"; payload: { isExpired: boolean } }
    | { type: "REPLAY" }
    | { type: "RESET" }

export function sessionReducer(state: State, action: Action): State {
    switch (action.type) {
        case "REPLAY":
            return { mode: "replay" }

        case "RESET":
            return { mode: "idle" }

        case "ENGINE_UPDATE": {
            const { index, textLength } = action.payload

            if (state.mode === "idle" && index > 0) {
                return { mode: "typing" }
            }

            if (index >= textLength) {
                return { mode: "results" }
            }

            return state
        }

        case "TIMER_UPDATE": {
            if (action.payload.isExpired) {
                return { mode: "results" }
            }
            return state
        }

        default:
            return state
    }
}
