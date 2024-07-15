import { ButtonContainer } from "@pixi/ui"
import { Text, Grid, Panel, TillingBackgroundMixin } from "../src/index.js"

import switchEvent from "./switch-panels-event.js"


export function SwitchPanel(member, panelNames) {
    const panel = new Panel
    panel.setBgDebug()
    panel.posizes.top = 0

    panelNames.forEach((namePanel, index) => {
        const button = new SwitchPanelButton(namePanel)
        button.onPress.connect(() => member.send(switchEvent, { state: namePanel }))
        panel.addChild(new Cell(button, index))
    })

    return panel
}

function Cell(element, offset = 0) {
    const subGrid = new Grid
    subGrid.tillingSizes.width = 4
    subGrid.tillingPosition.x = offset * 4
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
            fontFamily: 'Pixel',
            fontSize: 24,
        }
    })
    button.addChild(textButton)

    return button
}