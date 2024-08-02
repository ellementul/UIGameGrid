import { MemberFactory } from "@ellementul/uee-core"
import { event as loadedFileEvent, MIME_TYPES } from "./events/loaded-event.js"
import { event as addedAsset, ASSETS_TYPES } from "./events/added-asset-event.js"
import { decode } from "imagescript"

export class AssetsManagerMember extends MemberFactory {
    constructor() {
        super()

        this.assets = {
            images: new Map,
            textures: new Map
        }
    }

    onConnectRoom() {
        this.subscribe(loadedFileEvent, ({ type, fileName, data }) => {
            if(MIME_TYPES.image == type)
                this.getImageFromBuffer(fileName, data)
            else
                console.error({ type, fileName, data })
        })
    }

    // showOpenAssetPicker(assetType, assetName) {
    //     const input = document.createElement("input");
    //     input.type = "file";
    //     input.accept = assetType
    
    //     input.addEventListener("change", () => {
    //         const file = input.files[0]
    //         const reader = new FileReader()

    //         reader.addEventListener("load", async () => {
    //             await this.getImageFromBuffer(assetName, reader.result)
    //             await this.addTexture(assetName)
    //         })

    //         reader.readAsArrayBuffer(file)
    //     })

    //     input.click()
    // }

    async getImageFromBuffer(assetName, buffer) {
        const image = await decode(buffer)
        const png = await image.encode()

        this.assets.images.set(assetName, png)
        this.send(addedAsset, {
            asset: {
                type: ASSETS_TYPES.image,
                name: assetName,
                data: png
            }
        })
    }

    // async addTexture(assetName) {
    //     const png = this.assets.images.get(assetName)

    //     const blob = new Blob([png.buffer], { type: "image/png" })
    //     const bitmap = await createImageBitmap(blob)
    //     const source = new ImageSource({
    //         resource: bitmap
    //     })
    //     const texture = new Texture({ source })

    //     Cache.set(assetName, texture)
    //     this.assets.images.set(assetName, texture)
    //     this.send(loadedAssetEvent, { assetName })
    // }
}