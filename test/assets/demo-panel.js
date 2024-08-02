import { Assets, Texture } from "pixi.js"

import { uiMember, events as UIEvents } from "../../src/index.js"
import { events as loaderEvents } from "@ellementul/uee-local-loader"
import { Button, NineTillingBg, Panel, Text } from "../../src/index.js"

function LoadButton() {
    const text = "Download Asset"

    const button = new Button
    button.subTilling = 2
    button.tillingSizes.set(0.5 * button.subTilling * (text.length + 1), button.subTilling)
    button.setBg(new NineTillingBg(Assets.get("bgButton")))

    const label = new Text({
        text,
        style: {
            fontFamily: 'Pixel'
        }
    })

    button.addChild(label)

    return button
}

export function DemoAssets() {
    const panel = new Panel
    panel.debug(true)

    const button = new LoadButton

    button.onPress = () => uiMember.send(loaderEvents.load)

    panel.addChild(button)

    uiMember.subscribe(UIEvents.loaded, ({ name }) => {
        const bgTexture = new Texture({ source: Assets.get(name) })
        
        panel.debug()
        panel.setBg(bgTexture)
    })

    return panel
}