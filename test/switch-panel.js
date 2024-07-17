import { Text, Grid, Panel, Button, NineTillingBg } from "../src/index.js"

import switchEvent from "./switch-panels-event.js"


export function SwitchPanel(member, panelNames, background) {
    const panel = new Panel
    panel.posizes.top = 0

    panelNames.forEach((namePanel, index) => {
        const button = new SwitchPanelButton(namePanel, background)
        button.onPress = () => member.send(switchEvent, { state: namePanel })
        button.tillingSizes.x = 12
        button.tillingPosition.x = index * 6
        panel.addChild(button)
    })

    return panel
}


function SwitchPanelButton(text, background) {
    const button = new Button
    button.subTilling = 2
    button.tillingSizes.y = 2
    button.setBg(new NineTillingBg(background))

    const label = new Text({
        text,
        style: {
            fontFamily: 'Pixel',
            fontSize: 24,
        }
    })
    button.addChild(label)

    return button
}