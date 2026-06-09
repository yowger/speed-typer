import { useEffect, useState } from "react"

import { KeyboardKey } from "./KeyboardKey"
import { KEYBOARD_ROWS } from "../keyBoardLayout"

type KeyState = "active" | "correct" | "incorrect"

type LastInput = {
    code: string
    status: KeyState
} | null

type ActiveKey = {
    code: string
    state: KeyState
} | null

export type KeyHeat = {
    presses: number
    correct: number
    incorrect: number
}

export type KeyboardHeatmap = Record<string, KeyHeat>

type KeyboardMode = "live" | "heat"

type KeyboardProps = {
    mode?: KeyboardMode
    lastInput?: LastInput
    heatmap?: KeyboardHeatmap
}

export function Keyboard({ lastInput, heatmap, mode = "live" }: KeyboardProps) {
    const [activeKey, setActiveKey] = useState<ActiveKey>(null)

    const isLive = mode === "live"
    const isHeat = mode === "heat"

    useEffect(() => {
        function setKey() {
            if (!isLive || !lastInput) return

            setActiveKey({
                code: lastInput.code,
                state: lastInput.status,
            })
        }

        setKey()

        const timeout = setTimeout(() => {
            setActiveKey(null)
        }, 120)

        return () => clearTimeout(timeout)
    }, [lastInput, isLive])

    return (
        <div className="flex flex-col gap-2 items-center">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((item) => {
                        const heat = heatmap?.[item.code]

                        const isActive = isLive && activeKey?.code === item.code

                        const state = isActive ? activeKey?.state : undefined

                        const heatLevel =
                            isHeat && heat?.presses
                                ? heat.presses > 20
                                    ? "high"
                                    : heat.presses > 10
                                      ? "medium"
                                      : "low"
                                : undefined

                        return (
                            <KeyboardKey
                                key={item.code}
                                label={item.label ?? item.code}
                                shiftLabel={item.shiftLabel}
                                state={state}
                                heat={heatLevel}
                                presses={heat?.presses}
                                wide={item.wide}
                                extraWide={item.extraWide}
                                mode={mode}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
