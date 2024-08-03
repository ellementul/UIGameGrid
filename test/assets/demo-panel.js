import { Assets, Texture, Sprite } from "pixi.js"

import { uiMember, events as UIEvents, VerticalSlider, VerticalDynamicList, Grid, SliderMixin } from "../../src/index.js"
import { events as loaderEvents } from "@ellementul/uee-local-loader"
import { Button, NineTillingBg, Panel, Text } from "../../src/index.js"
import { event as shareListOfImagesEvent } from "./events/share-images-list-event.js"

function LoadButton(text) {
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

function ImagesList(setBg) {
    const list = new VerticalSlider
    list.tillingSizes.set(8, 10)
    list.autoPosition = true

    let images = new Map
    list.setImages = newImages => {
        newImages.forEach(imageName => {
            if(!images.has(imageName)) {
                const button = new LoadButton(imageName)
                button.onPress = () => setBg(new Texture({ source: Assets.get(imageName) }))
                list.strip.addChild(button)
                images.set(imageName, button)
            }
        })
    }

    return list
}

export function DemoAssets() {
    const panel = new Panel
    panel.debug(true)

    const button = new LoadButton("Download Asset")

    button.onPress = () => uiMember.send(loaderEvents.load)

    panel.addChild(button)

    const imagePanel = new Panel
    imagePanel.posizes.left = 9
    panel.addChild(imagePanel)
    
    const list = new ImagesList(texture => imagePanel.addChild(new Sprite(texture)))
    list.tillingPosition.set(0, 2)
    panel.addChild(list)

    uiMember.subscribe(shareListOfImagesEvent, ({ images }) => {
        list.setImages(images)
    })

    return panel
}