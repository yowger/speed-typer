import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts"

import type { TypingMetricsReturn } from "../utils/calculateTypingMetrics"

type MetricsPoint = {
    second: number
    rawWpm: number
    adjustedWpm: number
    accuracy: number
}

type MetricsProps = {
    metrics: TypingMetricsReturn
    history: MetricsPoint[]
}

export default function Metrics({ metrics, history }: MetricsProps) {
    return (
        <div className="space-y-8">
            <div className="h-56 w-full">
                <ResponsiveContainer>
                    <LineChart data={history}>
                        <XAxis dataKey="second" />
                        <YAxis />
                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="adjustedWpm"
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="rawWpm"
                            dot={false}
                            strokeDasharray="4 4"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <MetricCard label="Raw WPM" value={metrics.rawWpm} />

                <MetricCard label="Adjusted WPM" value={metrics.adjustedWpm} />

                <MetricCard label="Accuracy" value={`${metrics.accuracy}%`} />

                <MetricCard label="CPM" value={metrics.cpm} />

                <MetricCard
                    label="Error Rate"
                    value={`${metrics.errorRate}%`}
                />

                <MetricCard
                    label="Characters"
                    value={`${metrics.correctChars}/${metrics.totalTyped}`}
                />
            </div>
        </div>
    )
}

type MetricCardProps = {
    label: string
    value: string | number
}

function MetricCard({ label, value }: MetricCardProps) {
    return (
        <div className="rounded-lg border border-border bg-surface p-4">
            <div className="text-muted">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
        </div>
    )
}
