import {
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Area,
    AreaChart,
    Line,
    CartesianGrid,
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
    const tickStep = history.length <= 20 ? 2 : history.length <= 60 ? 5 : 10

    return (
        <div className="space-y-8">
            <div className="h-56 w-full">
                <ResponsiveContainer>
                    <AreaChart data={history}>
                        <CartesianGrid stroke="#2a2727" />
                        <defs>
                            <linearGradient
                                id="wpmGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="second"
                            ticks={history
                                .map((point) => point.second)
                                .filter((second) => second % tickStep === 0)}
                        />

                        <YAxis
                            label={{
                                value: "WPM",
                                angle: -90,
                                position: "insideLeft",
                            }}
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="adjustedWpm"
                            stroke="#3b82f6"
                            fill="url(#wpmGradient)"
                            strokeWidth={2}
                        />

                        <Line
                            type="monotone"
                            dataKey="rawWpm"
                            stroke="#94a3b8"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                        />
                    </AreaChart>
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
