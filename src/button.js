import { Grid } from "./grid.js"

export function Button() {
    const button = new Grid()

    button.eventMode = "static"
    button.on('click', event => {
        if(typeof button.onPress == "function")
            button.onPress(event)
    })

    return button
} 