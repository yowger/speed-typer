export type KeyboardKeyItem = {
    code: string
    label?: string
    shiftLabel?: string
    wide?: boolean
    extraWide?: boolean
}

export const KEYBOARD_ROWS: KeyboardKeyItem[][] = [
    [
        { code: "Backquote", label: "`", shiftLabel: "~" },
        { code: "Digit1", label: "1", shiftLabel: "!" },
        { code: "Digit2", label: "2", shiftLabel: "@" },
        { code: "Digit3", label: "3", shiftLabel: "#" },
        { code: "Digit4", label: "4", shiftLabel: "$" },
        { code: "Digit5", label: "5", shiftLabel: "%" },
        { code: "Digit6", label: "6", shiftLabel: "^" },
        { code: "Digit7", label: "7", shiftLabel: "&" },
        { code: "Digit8", label: "8", shiftLabel: "*" },
        { code: "Digit9", label: "9", shiftLabel: "(" },
        { code: "Digit0", label: "0", shiftLabel: ")" },
        { code: "Minus", label: "-", shiftLabel: "_" },
        { code: "Equal", label: "=", shiftLabel: "+" },
        {
            code: "Backspace",
            label: "Backspace",
            wide: true,
        },
    ],
    [
        {
            code: "Tab",
            label: "Tab",
            wide: true,
        },
        { code: "KeyQ", label: "q" },
        { code: "KeyW", label: "w" },
        { code: "KeyE", label: "e" },
        { code: "KeyR", label: "r" },
        { code: "KeyT", label: "t" },
        { code: "KeyY", label: "y" },
        { code: "KeyU", label: "u" },
        { code: "KeyI", label: "i" },
        { code: "KeyO", label: "o" },
        { code: "KeyP", label: "p" },
        { code: "BracketLeft", label: "[", shiftLabel: "{" },
        { code: "BracketRight", label: "]", shiftLabel: "}" },
        { code: "Backslash", label: "\\", shiftLabel: "|" },
    ],
    [
        {
            code: "CapsLock",
            label: "Caps",
            wide: true,
        },
        { code: "KeyA", label: "a" },
        { code: "KeyS", label: "s" },
        { code: "KeyD", label: "d" },
        { code: "KeyF", label: "f" },
        { code: "KeyG", label: "g" },
        { code: "KeyH", label: "h" },
        { code: "KeyJ", label: "j" },
        { code: "KeyK", label: "k" },
        { code: "KeyL", label: "l" },
        { code: "Semicolon", label: ";", shiftLabel: ":" },
        { code: "Quote", label: "'", shiftLabel: '"' },
        {
            code: "Enter",
            label: "Enter",
            wide: true,
        },
    ],

    [
        {
            code: "ShiftLeft",
            label: "Shift",
            wide: true,
        },

        { code: "KeyZ", label: "z" },
        { code: "KeyX", label: "x" },
        { code: "KeyC", label: "c" },
        { code: "KeyV", label: "v" },
        { code: "KeyB", label: "b" },
        { code: "KeyN", label: "n" },
        { code: "KeyM", label: "m" },

        { code: "Comma", label: ",", shiftLabel: "<" },
        { code: "Period", label: ".", shiftLabel: ">" },
        { code: "Slash", label: "/", shiftLabel: "?" },

        {
            code: "ShiftRight",
            label: "Shift",
            wide: true,
        },
    ],

    [
        {
            code: "ControlLeft",
            label: "Ctrl",
            wide: true,
        },

        {
            code: "MetaLeft",
            label: "Win",
            wide: true,
        },

        {
            code: "AltLeft",
            label: "Alt",
            wide: true,
        },

        {
            code: "Space",
            label: "Space",
            extraWide: true,
        },

        {
            code: "AltRight",
            label: "Alt",
            wide: true,
        },

        {
            code: "MetaRight",
            label: "Win",
            wide: true,
        },

        {
            code: "ContextMenu",
            label: "Menu",
            wide: true,
        },

        {
            code: "ControlRight",
            label: "Ctrl",
            wide: true,
        },
    ],
]
