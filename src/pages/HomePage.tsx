import { useState } from "react"

import { useTypingSounds } from "../core/sounds/hooks/useTypingSounds"
// import { Keyboard } from "../features/typing/components/Keyboard"
import { calculateTypingMetrics } from "../features/stats/utils/calculateTypingMetrics"
import TypingTextDisplay from "../features/typing/components/TypingTextDisplay"
import Metrics from "../features/stats/components/Metrics"
import useTypingSession from "../core/engine/hooks/useTypingSession"
// import { calculateKeyboardHeatmap } from '../features/typing/utils/calculateKeyboardHeatmap';
import ReplayModal from "../features/replay/components/ReplayModal"
import TimerProgress from "../features/typing/components/TimerProgress"
import TimerControls from "../features/typing/components/TimerControls"
import ModeControls from "../features/typing/components/ModeControls"
import { generateMetricHistory } from "./generateMetricHistory"
// import { Keyboard } from "lucide-react"
// import Navbar from "../ui/layout/navbar"

const TIME_DURATIONS = [15, 30, 60]
const TYPING_MODES = [
    "words",
    "numbers",
    // "quotes", "symbols", "code"
] as const

export default function HomePage() {
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
        // isPaused,
        // mode,
        // resume,
        // pause,
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
    const history = generateMetricHistory(keyEvents)

    // const keyboardMode = isResults ? "heat" : "live"
    // const heatmap = calculateKeyboardHeatmap(keyEvents)

    const [typingMode, setTypingMode] =
        useState<(typeof TYPING_MODES)[number]>("words")

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
        <div className="">
            <div className="flex flex-col gap-8">
                {isTyping ? (
                    <div className="flex self-center">
                        <TimerProgress remainingTime={remainingTime} />
                    </div>
                ) : (
                    <div className="flex gap-8 self-center">
                        <TimerControls
                            durations={TIME_DURATIONS}
                            duration={duration}
                            isTyping={isTyping}
                            onDurationChange={handleDurationChange}
                        />

                        <ModeControls
                            modes={TYPING_MODES}
                            mode={typingMode}
                            isTyping={isTyping}
                            onModeChange={setTypingMode}
                        />
                    </div>
                )}

                <TypingTextDisplay
                    displayIndex={currentIndex}
                    displayTyped={typed}
                    words={words}
                />
                {isResults && (
                    <div className="bg-surface rounded-lg p-4 ">
                        <div className="flex justify-between">
                            <h3>Time's up</h3>

                            <div className="flex gap-4">
                                <button onClick={resetSession}>Restart</button>
                                {/* <button onClick={() => setIsReplayOpen(true)}>
                                    Replay
                                </button> */}
                            </div>
                        </div>
                        {/* {isTyping && <button onClick={pause}>Pause</button>}
                    {isPaused && <button onClick={resume}>Resume</button>} */}
                    </div>
                )}
                {/* 
                <div className="text-sm text-gray-400 mb-4 flex gap-4">
                    <span>for debugging</span>
                    <span>Mode: {mode}</span>
                    <span>Time: {remainingTime}s</span>
                    <span>Duration: {duration}s</span>
                </div> */}

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

                {/*
                 */}
                {/* <Keyboard
                    lastInput={lastInput}
                    // heatmap={heatmap}
                    // mode={keyboardMode}
                /> */}

                {isResults && <Metrics metrics={metrics} history={history} />}

                <ReplayModal
                    open={isReplayOpen}
                    onClose={() => setIsReplayOpen(false)}
                    keyEvents={keyEvents}
                    words={words}
                />
            </div>
        </div>
    )
}
