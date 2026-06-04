import { cn } from "../../utils/cn"

type OptionGroupProps = {
    children: React.ReactNode
    className?: string
}

function OptionGroup({ children, className }: OptionGroupProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-8 rounded-lg bg-surface px-3 py-1.5",
                className,
            )}
        >
            {children}
        </div>
    )
}

type OptionGroupLabelProps = {
    icon?: React.ReactNode
    children: React.ReactNode
}

function OptionGroupLabel({ icon, children }: OptionGroupLabelProps) {
    return (
        <div className="flex items-center">
            {icon}

            <span className="text-accent">{children}</span>
        </div>
    )
}

type OptionGroupOptionsProps = {
    children: React.ReactNode
}

function OptionGroupOptions({ children }: OptionGroupOptionsProps) {
    return <div className="flex items-center gap-4">{children}</div>
}

type OptionGroupItemProps = {
    active?: boolean
    disabled?: boolean
    children: React.ReactNode
    onClick?: () => void
}

function OptionGroupItem({
    active,
    disabled,
    children,
    onClick,
}: OptionGroupItemProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "cursor-pointer text-sm transition-colors",
                active ? "text-accent" : "text-foreground hover:text-accent",
                disabled && "cursor-not-allowed opacity-50",
            )}
        >
            {children}
        </button>
    )
}

OptionGroup.Label = OptionGroupLabel
OptionGroup.Options = OptionGroupOptions
OptionGroup.Item = OptionGroupItem

export default OptionGroup
