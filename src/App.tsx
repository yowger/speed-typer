import { useState } from "react"

import { useTypingSounds } from "./core/sounds/hooks/useTypingSounds"
import { Keyboard } from "./features/typing/components/Keyboard"
import { calculateTypingMetrics } from "./features/stats/utils/calculateTypingMetrics"
import TypingTextDisplay from "./features/typing/components/TypingTextDisplay"
import Metrics from "./features/stats/components/Metrics"
import useTypingSession from "./core/engine/hooks/useTypingSession"
import { calculateKeyboardHeatmap } from "./features/typing/utils/calculateKeyboardHeatmap"
import ReplayModal from "./features/components/ReplayModal"
import { cn } from "./utils/cn"
import { TimerIcon } from "lucide-react"

const TIME_DURATIONS = [15, 30, 60]

export default function App() {
    const {
        currentIndex,
        typed,
        keyEvents,
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

    // const [soundEnabled, setSoundEnabled] = useState(false)
    // const [volume, setVolume] = useState(0.5)

    const [isReplayOpen, setIsReplayOpen] = useState(false)
    const elapsedMs = (duration - remainingTime) * 1000
    const metrics = calculateTypingMetrics({
        keyEvents,
        elapsedMs,
    })

    const keyboardMode = isResults ? "heat" : "live"
    const heatmap = calculateKeyboardHeatmap(keyEvents)

    // const { replayTyped, replayIndex } = useReplay({
    //     typed,
    //     isPlaying: isReplayMode,
    // })

    // const replayLastInput =
    //     replayIndex >= 0
    //         ? {
    //               code: replayTyped[replayIndex]?.code,
    //               status: replayTyped[replayIndex]?.status,
    //           }
    //         : null

    return (
        <div className="font-sans flex flex-col min-h-screen bg-background text-foreground">
            <div className="px-8 text-sm text-gray-400 mb-4 flex gap-4">
                <span>for debugging</span>
                <span>Mode: {mode}</span>
                <span>Time: {remainingTime}s</span>
                <span>Duration: {duration}s</span>
            </div>

            <div className="max-w-4xl flex flex-col gap-8">
                <div className="inline-flex bg-surface rounded-lg px-3 py-1.5 self-center items-center gap-2">
                    <div className="flex items-center">
                        <TimerIcon className="w-4 h-4 mr-1 text-accent" />
                        <span className="text-accent">time</span>
                    </div>

                    <div>
                        {TIME_DURATIONS.map((value) => (
                            <button
                                key={value}
                                onClick={() => handleDurationChange(value)}
                                disabled={isTyping}
                                className={cn(
                                    "text-sm px-2 py-1 cursor-pointer",
                                    duration === value
                                        ? "text-accent"
                                        : "text-foreground",
                                )}
                            >
                                {value}s
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden border border-white/5">
                        <div className="h-full w-3/4 bg-accent"></div>
                    </div>
                    <span
                        className="text-accent text-lg font-semibold"
                        style={{ transition: "width 1s linear" }}
                    >
                        {remainingTime}
                    </span>
                </div>

                <TypingTextDisplay
                    displayIndex={currentIndex}
                    displayTyped={typed}
                    words={words}
                />

                <div>
                    {isResults && (
                        <div className="flex gap-4">
                            <button onClick={resetSession}>Restart</button>
                            <button onClick={() => setIsReplayOpen(true)}>
                                Replay
                            </button>
                        </div>
                    )}
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
            </div>

            <Keyboard
                lastInput={lastInput}
                heatmap={heatmap}
                mode={keyboardMode}
            />

            {isResults && <Metrics metrics={metrics} />}

            <ReplayModal
                open={isReplayOpen}
                onClose={() => setIsReplayOpen(false)}
                keyEvents={keyEvents}
                words={words}
            />
        </div>
    )
}
