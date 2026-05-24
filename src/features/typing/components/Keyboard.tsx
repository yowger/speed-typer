import { useEffect, useState } from "react"

import { KeyboardKey } from "./KeyboardKey"
import { KEYBOARD_ROWS } from "./keyBoardLayout"

type KeyState = "active" | "correct" | "incorrect"

type LastInput = {
    key: string
    code: string
    status: KeyState
} | null

type KeyboardProps = {
    lastInput?: LastInput
}

type ActiveKey = {
    code: string
    state: KeyState
} | null

export function Keyboard({ lastInput }: KeyboardProps) {
    const [activeKey, setActiveKey] = useState<ActiveKey>(null)

    useEffect(() => {
        function setKey() {
            if (!lastInput) return

            setActiveKey({
                code: lastInput.code,
                state: lastInput.status,
            })
        }

        setKey()

        const timeout = setTimeout(() => {
            setActiveKey(null)
        }, 150)

        return () => clearTimeout(timeout)
    }, [lastInput])

    return (
        <div className="flex flex-col gap-2 items-center">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((item) => {
                        const isActive = activeKey?.code === item.code

                        const state = isActive ? activeKey.state : undefined

                        return (
                            <KeyboardKey
                                key={item.code}
                                label={item.label ?? item.code}
                                shiftLabel={item.shiftLabel}
                                state={state}
                                wide={item.wide}
                                extraWide={item.extraWide}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
