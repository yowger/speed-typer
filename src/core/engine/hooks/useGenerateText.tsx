import { useEffect, useMemo, useRef, useState } from "react"

import { createSentenceGenerator } from "../../../features/word/utils/sentenceGenerator"
import { getWordChars } from "../../../features/word/utils/utils"

export function useGenerateText() {
    const generatorRef = useRef(createSentenceGenerator())
    const [sentences, setSentences] = useState<string[]>([])

    const text = sentences.join(" ")
    const words = useMemo(() => getWordChars(text), [text])

    const loadMore = (currentIndex: number) => {
        if (currentIndex > text.length * 0.8) {
            const next = generatorRef.current.nextBatch(4)
            setSentences((prev) => [...prev, ...next])
        }
    }

    const reset = () => {
        generatorRef.current = createSentenceGenerator()
        setSentences(generatorRef.current.nextBatch(4))
    }

    useEffect(() => {
        setSentences(generatorRef.current.nextBatch(4))
    }, [])

    return {
        text,
        words,
        loadMore,
        reset,
    }
}
