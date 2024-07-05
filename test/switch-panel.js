import { Text } from "pixi.js"
import { ButtonContainer } from "@pixi/ui"
import { Grid, Panel, TillingBackgroundMixin } from "../src/index.js"

import switchEvent from "./switch-panels-event.js"


export function SwitchPanel(member) {
    const panel = new Panel
    panel.setBgDebug()
    panel.posizes.top = 0

    const panelNames = ["Grid", "Panel"]
    panelNames.forEach((namePanel, index) => {
        const button = new SwitchPanelButton(namePanel)
        button.onPress.connect(() => member.send(switchEvent, { state: namePanel }))
        panel.addChild(new Cell(button, index))
    })

    return panel
}

function Cell(element, offset = 0) {
    const subGrid = new Grid
    subGrid.tillingSizes.width = 2
    subGrid.tillingPosition.x = offset * 2
    subGrid.addChild(element)

    return subGrid
}


function SwitchPanelButton(text) {
    const button = new ButtonContainer()
    TillingBackgroundMixin(button)
    button.subTilling = 2
    button.setBgDebug()

    const textButton = new Text({
        text,
        style: {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
            
        }
    })
    button.addChild(textButton)

    return button
}