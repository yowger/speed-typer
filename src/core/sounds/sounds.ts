import { Howl } from "howler"

export const keySound = new Howl({
    src: ["/assets/sounds/key_press_1.mp3"],
    volume: 0.15,
})

export const spaceSound = new Howl({
    src: ["/assets/sounds/space_key.mp3"],
    volume: 0.15,
})

export const backspaceSound = new Howl({
    src: ["/assets/sounds/backspace.mp3"],
    volume: 0.15,
})

export const errorSound = new Howl({
    src: ["/assets/sounds/error.mp3"],
    volume: 0.15,
})
