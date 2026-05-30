export type SessionMode = "idle" | "typing" | "results" | "replay"

export type SessionState = {
    mode: SessionMode
}

export type SessionAction =
    | { type: "START_TYPING" }
    | { type: "FINISH" }
    | { type: "TIME_UP" }
    | { type: "REPLAY" }
    | { type: "RESET" }

export function sessionReducer(
    state: SessionState,
    action: SessionAction,
): SessionState {
    switch (action.type) {
        case "START_TYPING":
            if (state.mode === "idle") {
                return { mode: "typing" }
            }
            return state

        case "FINISH":
        case "TIME_UP":
            return { mode: "results" }

        case "REPLAY":
            return { mode: "replay" }

        case "RESET":
            return { mode: "idle" }

        default:
            return state
    }
}
