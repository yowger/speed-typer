// import { useState } from "react"

import { useTypingSounds } from "./core/sounds/hooks/useTypingSounds"
import { Keyboard } from "./features/typing/components/Keyboard"
import { calculateTypingMetrics } from "./features/stats/utils/calculateTypingMetrics"
import TypingTextDisplay from "./ui/TypingTextDisplay"
import Metrics from "./ui/Metrics"
import useTypingSession from "./core/engine/hooks/useTypingSession"

const TIME_DURATIONS = [15, 30, 45, 60, 120]

export default function App() {
    const {
        currentIndex,
        typed,
        words,
        lastInput,
        remainingTime,
        duration,
        isResults,
        isTyping,
        isPaused,
        mode,
        resume,
        pause,
        resetSession,
        handleDurationChange,
    } = useTypingSession()
    useTypingSounds(lastInput)

    const globalIndex = 0
    // const [soundEnabled, setSoundEnabled] = useState(false)
    // const [volume, setVolume] = useState(0.5)

    const elapsedMs = (duration - remainingTime) * 1000
    const metrics = calculateTypingMetrics({
        typed,
        elapsedMs,
    })

    // const [isReplayMode, setIsReplayMode] = useState(false)
    // const { replayTyped, replayIndex } = useReplay({
    //     typed,
    //     isPlaying: isReplayMode,
    // })

    // const metrics = isTimedOut
    //     ? calculateTypingMetrics({
    //           typed,
    //           elapsedMs,
    //       })
    //     : null
    // const heatmap = calculateKeyboardHeatmap(typed)

    // const keyboardMode = isReplayMode ? "live" : isTimedOut ? "heat" : "live"

    // const replayLastInput =
    //     replayIndex >= 0
    //         ? {
    //               code: replayTyped[replayIndex]?.code,
    //               status: replayTyped[replayIndex]?.status,
    //           }
    //         : null
    // const displayLastInput = isReplayMode ? replayLastInput : lastInput

    // const keyboardMode = isReplayMode ? "live" : isTimedOut ? "heat" : "live"

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <div className="mt-8 max-w-4xl self-center">
                {TIME_DURATIONS.map((value) => (
                    <button
                        key={value}
                        onClick={() => handleDurationChange(value)}
                        disabled={isTyping}
                        className={`
                px-3 py-1 rounded border
                ${
                    duration === value
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                }
            `}
                    >
                        {value}s
                    </button>
                ))}

                <div className="px-8 text-sm text-gray-400 mb-4 flex gap-4">
                    <span>Mode: {mode}</span>
                    <span>Time: {remainingTime}s</span>
                    <span>Duration: {duration}s</span>

                    {isResults && (
                        <span className="text-red-500">Finished</span>
                    )}
                </div>

                <TypingTextDisplay
                    displayIndex={currentIndex}
                    displayTyped={typed}
                    words={words}
                    globalIndex={globalIndex}
                />

                {isResults && <button onClick={resetSession}>Restart</button>}
                {isTyping && <button onClick={pause}>Pause</button>}
                {isPaused && <button onClick={resume}>Resume</button>}
            </div>

            {/* {isTimedOut && (
                <div>
                    <button
                        onClick={() => setIsReplayMode(true)}
                        className="rounded-lg border border-zinc-700 px-4 py-2"
                    >
                        Replay
                    </button>
                </div>
            )} */}

            <Keyboard
                lastInput={lastInput}
                // heatmap={heatmap}
                // mode={keyboardMode}
            />

            {isResults && <Metrics metrics={metrics} />}
        </div>
    )
}
