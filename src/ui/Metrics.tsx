type MetricsProps = {
    metrics: {
        rawWpm: number
        adjustedWpm: number
        accuracy: number
        cpm: number
        errorRate: number
        totalTyped: number
        correctChars: number
    }
}

export default function Metrics({ metrics }: MetricsProps) {
    return (
        <div>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="text-zinc-500">Raw WPM</div>
                    <div className="text-2xl font-semibold">
                        {metrics.rawWpm}
                    </div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="text-zinc-500">Adjusted WPM</div>
                    <div className="text-2xl font-semibold">
                        {metrics.adjustedWpm}
                    </div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="text-zinc-500">Accuracy</div>
                    <div className="text-2xl font-semibold">
                        {metrics.accuracy}%
                    </div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="text-zinc-500">CPM</div>
                    <div className="text-2xl font-semibold">{metrics.cpm}</div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="text-zinc-500">Error Rate</div>
                    <div className="text-2xl font-semibold">
                        {metrics.errorRate}%
                    </div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="text-zinc-500">Characters</div>
                    <div className="text-2xl font-semibold">
                        {metrics.correctChars}/{metrics.totalTyped}
                    </div>
                </div>
            </div>
        </div>
    )
}
