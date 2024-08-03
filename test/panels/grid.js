import { Assets } from "pixi.js"
import { Button, Grid, NineTillingBg, Text } from "../../src/index.js"

function TextButton(text) {
    const button = new Button
    button.subTilling = 2
    button.tillingSizes.set(6, 2)
    button.setBg(new NineTillingBg(Assets.get("bgButton")))

    const label = new Text({
        text,
        style: {
            fontFamily: 'Pixel',
            fontSize: 18,
        }
    })

    button.addChild(label)

    return button
}

export function DemoGrid() {
    const demoGrid = new Grid
    demoGrid.tillingPosition.set(1,1)
    demoGrid.tillingSizes.x = 16
    demoGrid.tillingSizes.y = 16  
    demoGrid.debug(true)

    const subGrid = new Grid
    subGrid.subTilling = 2
    subGrid.tillingSizes.set(16,16)
    subGrid.tillingPosition.set(0,1.5)
    subGrid.debug(true)
    demoGrid.addChild(subGrid)

    const showButton = new TextButton("Show")
    const hideButton = new TextButton("Hide")
    hideButton.tillingPosition.x = 3

    showButton.onPress = () => subGrid.show()
    hideButton.onPress = () => subGrid.hide()

    demoGrid.addChild(showButton, hideButton)

    return demoGrid
}