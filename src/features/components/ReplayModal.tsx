import { useState } from "react"

import { Dialog, DialogPanel } from "@headlessui/react"
import { useReplay } from "../replay/hooks/useReplay"
import TypingTextDisplay from "../typing/components/TypingTextDisplay"

import { type TypedChar } from "../replay/hooks/useReplay"

type ReplayModalProps = {
    open: boolean
    onClose: () => void
    typed: TypedChar[]
    words: string[][]
}

export default function ReplayModal({
    open,
    onClose,
    typed,
    words,
}: ReplayModalProps) {
    const [replayId, setReplayId] = useState(0)

    const { replayTyped, replayIndex } = useReplay({
        typed,
        replayId,
    })

    const isFinished = replayTyped.length === typed.length
    const isPlaying = replayTyped.length > 0 && !isFinished

    const play = () => {
        setReplayId((v) => v + 1)
    }

    const restart = () => {
        if (isPlaying) return
        setReplayId((v) => v + 1)
    }

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/70" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-4xl rounded-xl bg-zinc-900 p-6">
                    <div className="mb-4 flex gap-2">
                        <button
                            onClick={play}
                            disabled={isPlaying}
                            className="rounded border px-3 py-1 disabled:opacity-50"
                        >
                            Play
                        </button>

                        <button
                            onClick={restart}
                            disabled={isPlaying}
                            className="rounded border px-3 py-1 disabled:opacity-50"
                        >
                            Restart
                        </button>

                        <button
                            onClick={onClose}
                            className="rounded border px-3 py-1"
                        >
                            Close
                        </button>
                    </div>

                    <TypingTextDisplay
                        displayIndex={replayIndex + 1}
                        displayTyped={replayTyped}
                        words={words}
                        globalIndex={0}
                    />
                </DialogPanel>
            </div>
        </Dialog>
    )
}
