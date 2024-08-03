import { Assets, Texture } from "pixi.js"

import { uiMember, events as UIEvents, VerticalSlider, VerticalDynamicList } from "../../src/index.js"
import { events as loaderEvents } from "@ellementul/uee-local-loader"
import { Button, NineTillingBg, Panel, Text } from "../../src/index.js"
import { event as shareListOfImagesEvent } from "./events/share-images-list-event.js"

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

function ImagesList() {
    const list = new VerticalSlider
    list.fitX = true
    list.tillingSizes.y = 10
    list.strip.addChild(new LoadButton)

    return list
}

export function DemoAssets() {
    const panel = new Panel
    panel.debug(true)

    const button = new LoadButton

    button.onPress = () => uiMember.send(loaderEvents.load)

    panel.addChild(button)

    const list = new ImagesList
    list.tillingPosition.set(0, 2)
    panel.addChild(list)

    uiMember.subscribe(shareListOfImagesEvent, (event) => {
        console.log(event)
    })

    return panel
}