export type KeyboardKeyItem = {
    key: string
    label?: string
    wide?: boolean
}

export const KEYBOARD_ROWS: KeyboardKeyItem[][] = [
    [
        { key: "q" },
        { key: "w" },
        { key: "e" },
        { key: "r" },
        { key: "t" },
        { key: "y" },
        { key: "u" },
        { key: "i" },
        { key: "o" },
        { key: "p" },
    ],
    [
        { key: "a" },
        { key: "s" },
        { key: "d" },
        { key: "f" },
        { key: "g" },
        { key: "h" },
        { key: "j" },
        { key: "k" },
        { key: "l" },
    ],
    [
        { key: "z" },
        { key: "x" },
        { key: "c" },
        { key: "v" },
        { key: "b" },
        { key: "n" },
        { key: "m" },
    ],
    [
        {
            key: " ",
            label: "Space",
            wide: true,
        },
    ],
]
