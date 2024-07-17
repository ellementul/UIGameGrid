import { DEPRECATED_SCALE_MODES, Point } from "pixi.js"
import { TileMap } from "../tilemap.js"

export class NineTillingBg extends TileMap {
    constructor(texture) {
        super()

        this.isTillingGrid = true
        this.isBackground = true

        const source = texture.source
        source.scaleMode = DEPRECATED_SCALE_MODES.NEAREST
        this.sliceAtlas(source, new Point(3, 3))
        
        this.tillingSizes = new Point

        this.on('added', () => this.updateSizes())
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTillingGrid)
            return

        if(!this.tillingSizes.equals(this.parent.tillingSizes)) {
            this.tillingSizes.copyFrom(this.parent.tillingSizes)

            this.clear()

            for (let y = 0; y < this.tillingSizes.y; y++) {
                for (let x = 0; x < this.tillingSizes.x; x++) {
                    const frame = new Point(this.calcBound(x, this.tillingSizes.x), this.calcBound(y, this.tillingSizes.y))
                    this.set({x, y}, this.atlas.frames[frame.y][frame.x])
                }
            }
        }

        const tileSize = this.parent.tileSize
        this.scale.set(
            tileSize / this.tileSizes.x,
            tileSize / this.tileSizes.y
        )
    }

    calcBound(coord, limit) {
        if(coord == 0)
            return 0
    
        if(coord + 1 == limit)
            return 2
    
        return 1
    }
}