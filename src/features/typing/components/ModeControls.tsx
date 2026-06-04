import { Settings2Icon } from "lucide-react"

import OptionGroup from "../../../ui/modal/OptionGroup"

type ModeControlsProps<T extends string> = {
    modes: readonly T[]
    mode: T
    isTyping: boolean
    onModeChange: (mode: T) => void
}

export default function ModeControls<T extends string>({
    modes,
    mode,
    isTyping,
    onModeChange,
}: ModeControlsProps<T>) {
    return (
        <OptionGroup>
            <OptionGroup.Label
                icon={<Settings2Icon className="mr-1 h-4 w-4 text-accent" />}
            >
                Mode
            </OptionGroup.Label>

            <OptionGroup.Options>
                {modes.map((value) => (
                    <OptionGroup.Item
                        key={value}
                        active={mode === value}
                        disabled={isTyping}
                        onClick={() => onModeChange(value)}
                    >
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </OptionGroup.Item>
                ))}
            </OptionGroup.Options>
        </OptionGroup>
    )
}
