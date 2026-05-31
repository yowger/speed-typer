import { useEffect, useMemo, useRef, useState } from "react"

import { createSentenceGenerator } from "../../../features/word/utils/sentenceGenerator"
import { getWordChars } from "../../../features/word/utils/utils"

const LOAD_THRESHOLD = 0.8
const BATCH_SIZE = 4

export function useGenerateText() {
    const generatorRef = useRef(createSentenceGenerator())
    const [sentences, setSentences] = useState<string[]>([])

    const text = sentences.join(" ")

    const words = useMemo(() => getWordChars(text), [text])

    const loadMore = () => {
        const next = generatorRef.current.nextBatch(BATCH_SIZE)
        setSentences((prev) => [...prev, ...next])
    }

    const onProgress = (currentIndex: number) => {
        const thresholdIndex = text.length * LOAD_THRESHOLD

        if (currentIndex > thresholdIndex) {
            loadMore()
        }
    }

    const reset = () => {
        generatorRef.current = createSentenceGenerator()
        setSentences(generatorRef.current.nextBatch(BATCH_SIZE))
    }

    useEffect(() => {
        setSentences(generatorRef.current.nextBatch(BATCH_SIZE))
    }, [])

    return {
        text,
        words,
        onProgress,
        reset,
    }
}
