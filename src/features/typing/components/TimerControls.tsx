import { TimerIcon } from "lucide-react"

import OptionGroup from "../../../ui/modal/OptionGroup"

type TimerControlsProps = {
    durations: number[]
    duration: number
    isTyping: boolean
    onDurationChange: (value: number) => void
}

export default function TimerControls({
    durations,
    duration,
    isTyping,
    onDurationChange,
}: TimerControlsProps) {
    return (
        <OptionGroup>
            <OptionGroup.Label
                icon={<TimerIcon className="mr-1 h-4 w-4 text-accent" />}
            >
                Time
            </OptionGroup.Label>

            <OptionGroup.Options>
                {durations.map((value) => (
                    <OptionGroup.Item
                        key={value}
                        active={duration === value}
                        disabled={isTyping}
                        onClick={() => onDurationChange(value)}
                    >
                        {value}s
                    </OptionGroup.Item>
                ))}
            </OptionGroup.Options>
        </OptionGroup>
    )
}
