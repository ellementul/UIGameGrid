import { MemberFactory } from "@ellementul/uee-core"
import { decode } from "imagescript"

import { event as loadedFileEvent, MIME_TYPES } from "./events/loaded-event.js"
import { event as addedAsset, ASSETS_TYPES } from "./events/added-asset-event.js"
import { event as shareListEvent } from "./events/share-assets-list-event.js"


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
        this.sendListOfAssets({ type: ASSETS_TYPES.image })
    }

    sendListOfAssets({ type }) {
        const payload = { type }

        switch (type) {
            case ASSETS_TYPES.image:
                payload.images = this.getListImages()
                break;
            default:
                break;
        }

        this.send(shareListEvent, payload)
    }

    getListImages() {
        return [...this.assets.images.keys()]
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