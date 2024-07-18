import { DEPRECATED_SCALE_MODES, Point } from "pixi.js"
import { TileMap } from "../tilemap.js"

export class TillingBg extends TileMap {
    constructor(texture) {
        super()

        this.isTilling = true
        this.isBackground = true

        texture.source.scaleMode = DEPRECATED_SCALE_MODES.NEAREST

        this.texture = texture
        this.tileSizes.set(texture.width, texture.height)
        this.tillingSizes = new Point

        this.on('added', () => this.updateSizes())
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTilling)
            return

        if(!this.tillingSizes.equals(this.parent.tillingSizes)) {
            this.tillingSizes.copyFrom(this.parent.tillingSizes)

            this.clear()
            for (let y = 0; y < this.tillingSizes.y; y++) {
                for (let x = 0; x < this.tillingSizes.x; x++) {
                    this.set({x, y}, this.texture)
                }
            }
        }

        const tileSize = this.parent.tileSize
        this.scale.set(
            tileSize / this.tileSizes.x,
            tileSize / this.tileSizes.y
        )
    }
}