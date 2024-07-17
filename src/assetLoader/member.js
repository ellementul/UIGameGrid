import { MemberFactory } from "@ellementul/uee-core"
import uploadAssetEvent from "./upload-local-asset-event.js"
import loadedAssetEvent from "./loaded-asset-event.js"
import { Assets } from "pixi.js"

export class AssetLoaderMember extends MemberFactory {
    onConnectRoom() {
        this.subscribe(uploadAssetEvent, ({ assetType, assetName }) => {
            this.showOpenAssetPicker(assetType, assetName)
        })
    }

    showOpenAssetPicker(assetType, assetName) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = assetType
    
        input.addEventListener("change", () => {
            const file = input.files[0]
            const reader = new FileReader()

            reader.addEventListener("load", async () => {
                Assets.add({ alias: assetName, src: reader.result })
                await Assets.load(assetName)
                this.send(loadedAssetEvent, { assetName })
            })

            reader.readAsDataURL(file)
        })
    
        input.click()
    }
}