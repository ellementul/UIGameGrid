import { UploadAssetButton } from "../src/assetLoader/button.js";
import { NineTillingBg, Panel, Text } from "../src/index.js";
import loadedAssetEvent from "../src/assetLoader/loaded-asset-event.js"
import { Assets } from "pixi.js";

export function ImagePicker(bg, member) {
    const panel = new Panel
    panel.debug(true)

    const button = new UploadAssetButton(member)
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

    member.subscribe(loadedAssetEvent, ({ assetName }) => {
        const texture = Assets.get(assetName)
        panel.debug()
        panel.setBg(texture)
    })

    return panel
}