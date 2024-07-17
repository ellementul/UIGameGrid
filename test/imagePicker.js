import { Button, NineTillingBg, Panel, Text, events } from "../src/index.js";

export function ImagePicker(bg, member) {
    const panel = new Panel
    panel.debug(true)

    const button = new Button
    button.subTilling = 2
    button.tillingSizes.x = 10
    button.tillingSizes.y = 2
    button.setBg(new NineTillingBg(bg))
    panel.addChild(button)

    const label = new Text({
        text: "Open Image",
        style: {
            fontFamily: 'Pixel',
            fontSize: 20,
        }
    })
    button.addChild(label)
    button.onPress = () => {
        member.send(events.uploadAssetEvent)
    }

    return panel
}