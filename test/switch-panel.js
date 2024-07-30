import { Text, Grid, Panel, Button, NineTillingBg, DynamicListMixin } from "../src/index.js"

import switchEvent from "./switch-panels-event.js"


export function SwitchPanel(member, panelNames, background) {
    const panel = new Panel
    DynamicListMixin(panel, false)
    panel.posizes.top = 0

    panelNames.forEach((namePanel, index) => {
        const button = new SwitchPanelButton(namePanel, background)
        button.onPress = () => member.send(switchEvent, { state: namePanel })
        panel.addChild(button)
    })

    return panel
}


function SwitchPanelButton(text, background) {
    const button = new Button
    button.subTilling = 2
    button.tillingSizes.set(0.5 * button.subTilling * (text.length + 1), button.subTilling)
    button.setBg(new NineTillingBg(background))

    const label = new Text({
        text,
        style: {
            fontFamily: 'Pixel'
        }
    })
    button.addChild(label)

    return button
}