import { MemberFactory } from "@ellementul/uee-core"
import { Application, Cache, ImageSource } from "pixi.js"
import { RootGrid } from "./root-grid.js"
import { Stats } from './stats.js'

import { event as addedAssetEvent, ASSETS_TYPES } from "./events/added-asset-event.js"
import { event as loadedAssetInCache } from "./events/loaded-asset-event.js"

export class UIMember extends MemberFactory {
    constructor() {
        super()

        document.body.style.margin = "0px 0px 0px 0px"

        const app = new Application()
        app.init({ resizeTo: window, hello: true })
        .then(() => document.body.appendChild(app.canvas))
        this.rootGrid = new RootGrid(app)
        app.stage.addChild(this.rootGrid)
        this.app = app

        this.makeRoom()
        this.subscribe(addedAssetEvent, event => this.addAsset(event))
    }

    addAsset({ asset }) {
        switch (asset.type) {
            case ASSETS_TYPES.image:
                this.addImageSource(asset)
                break;
            default:
                console.error(asset)
        }
    }

    async addImageSource({ name, data }) {
        const blob = new Blob([data.buffer], { type: "image/png" })
        const bitmap = await createImageBitmap(blob)
        const source = new ImageSource({
            resource: bitmap
        })

        Cache.set(name, source)

        this.send(loadedAssetInCache, { name })
    }

    debug (isDebug) {
        if(isDebug) {
            window.__PIXI_APP__ = this.app // Pixi.js DevTools

            const stats = new Stats()
            stats.showPanel(0)
            document.body.appendChild( stats.dom )

            const animate = () => {
                stats.begin()
                stats.end()
                requestAnimationFrame(animate)
            }
            
            requestAnimationFrame( animate )
        }
    }
}
