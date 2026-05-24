import { SENTENCES } from "../sentences"
import { createSeededRandom } from "./utils"

type GeneratorOptions = {
    seed?: number
}

export function createSentenceGenerator(options: GeneratorOptions = {}) {
    const seed = options.seed ?? Date.now()
    const random = createSeededRandom(seed)

    let pool = [...SENTENCES]

    function shuffle() {
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1))
            ;[pool[i], pool[j]] = [pool[j], pool[i]]
        }
    }

    shuffle()

    let index = 0

    function nextSentence() {
        if (index >= pool.length) {
            shuffle()
            index = 0
        }

        return pool[index++]
    }

    function nextBatch(count: number) {
        return Array.from({ length: count }, () => nextSentence())
    }

    function reset() {
        pool = [...SENTENCES]
        shuffle()
        index = 0
    }

    return {
        nextSentence,
        nextBatch,
        reset,
    }
}
