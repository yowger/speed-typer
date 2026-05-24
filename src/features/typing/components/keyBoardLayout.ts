export type KeyboardKeyItem = {
    key: string
    label?: string
    shiftLabel?: string
    wide?: boolean
    extraWide?: boolean
}

export const KEYBOARD_ROWS: KeyboardKeyItem[][] = [
    [
        { key: "`", label: "`", shiftLabel: "~" },
        { key: "1", shiftLabel: "!" },
        { key: "2", shiftLabel: "@" },
        { key: "3", shiftLabel: "#" },
        { key: "4", shiftLabel: "$" },
        { key: "5", shiftLabel: "%" },
        { key: "6", shiftLabel: "^" },
        { key: "7", shiftLabel: "&" },
        { key: "8", shiftLabel: "*" },
        { key: "9", shiftLabel: "(" },
        { key: "0", shiftLabel: ")" },
        { key: "-", shiftLabel: "_" },
        { key: "=", shiftLabel: "+" },
        {
            key: "Backspace",
            label: "Backspace",
            wide: true,
        },
    ],

    [
        {
            key: "Tab",
            label: "Tab",
            wide: true,
        },
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
        { key: "[", shiftLabel: "{" },
        { key: "]", shiftLabel: "}" },
        { key: "\\", shiftLabel: "|" },
    ],

    [
        {
            key: "CapsLock",
            label: "Caps",
            wide: true,
        },
        { key: "a" },
        { key: "s" },
        { key: "d" },
        { key: "f" },
        { key: "g" },
        { key: "h" },
        { key: "j" },
        { key: "k" },
        { key: "l" },
        { key: ";", shiftLabel: ":" },
        { key: "'", shiftLabel: '"' },
        {
            key: "Enter",
            label: "Enter",
            wide: true,
        },
    ],

    [
        {
            key: "Shift",
            label: "Shift",
            wide: true,
        },
        { key: "z" },
        { key: "x" },
        { key: "c" },
        { key: "v" },
        { key: "b" },
        { key: "n" },
        { key: "m" },
        { key: ",", shiftLabel: "<" },
        { key: ".", shiftLabel: ">" },
        { key: "/", shiftLabel: "?" },
        {
            key: "ShiftRight",
            label: "Shift",
            wide: true,
        },
    ],

    [
        {
            key: "Control",
            label: "Ctrl",
            wide: true,
        },
        {
            key: "Alt",
            label: "Alt",
            wide: true,
        },

        {
            key: " ",
            label: "Space",
            extraWide: true,
        },

        {
            key: "AltRight",
            label: "Alt",
            wide: true,
        },
        {
            key: "ControlRight",
            label: "Ctrl",
            wide: true,
        },
    ],
]
