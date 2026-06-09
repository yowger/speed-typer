type State = {
    mode: "idle" | "typing" | "paused" | "results"
}

type Action =
    | { type: "ENGINE_UPDATE"; payload: { index: number; textLength: number } }
    | { type: "TIMER_UPDATE"; payload: { isExpired: boolean } }
    | { type: "PAUSE" }
    | { type: "RESUME" }
    | { type: "RESET" }

export function sessionReducer(state: State, action: Action): State {
    switch (action.type) {
        case "RESET":
            return { mode: "idle" }

        case "PAUSE":
            if (state.mode === "typing") {
                return { mode: "paused" }
            }

            return state

        case "RESUME":
            if (state.mode === "paused") {
                return { mode: "typing" }
            }

            return state

        case "ENGINE_UPDATE": {
            const { index, textLength } = action.payload

            if (!textLength) return state

            switch (state.mode) {
                case "idle":
                    if (index > 0) {
                        return { mode: "typing" }
                    }
                    break

                case "typing":
                    if (index >= textLength) {
                        return { mode: "results" }
                    }
                    break
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
