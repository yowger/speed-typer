import { useEffect, useState } from "react"

import { KeyboardKey } from "./KeyboardKey"
import { KEYBOARD_ROWS } from "./keyBoardLayout"

type KeyState = "active" | "correct" | "incorrect"

type LastInput = {
    key: string
    status: KeyState
} | null

type KeyboardProps = {
    lastInput?: LastInput
}

type ActiveKey = {
    key: string
    state: KeyState
} | null

export function Keyboard({ lastInput }: KeyboardProps) {
    const [activeKey, setActiveKey] = useState<ActiveKey>(null)

    useEffect(() => {
        function setKeys() {
            if (!lastInput) return

            setActiveKey({
                key: lastInput.key.toLowerCase(),
                state: lastInput.status,
            })
        }

        setKeys()

        const timeout = setTimeout(() => {
            setActiveKey(null)
        }, 150)

        return () => clearTimeout(timeout)
    }, [lastInput])

    return (
        <div className="flex flex-col gap-2">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((item) => {
                        const isActive =
                            activeKey?.key === item.key.toLowerCase()

                        const state = isActive ? activeKey.state : undefined

                        return (
                            <KeyboardKey
                                key={item.key}
                                label={item.label ?? item.key}
                                state={state}
                                wide={item.wide}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
