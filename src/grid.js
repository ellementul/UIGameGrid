import { Container, Point, Sprite } from "pixi.js"
import 'pixi.js/math-extras'

const FIT_NONE = null
const FIT_WIDTH = "width"
const FIT_HEIGHT = "height"

class Grid extends Container {
    constructor(options) {
        super(options)

        this.sizesByTilling = { width: 1, height: 1 }
        this.positionByTilling = new Point(0, 0)
        this.tileSize = 0

        this.fitMode = FIT_WIDTH
        this.onRender = () => this.updateSizes()
    }

    setTileSize(size) {
        this.fitMode = FIT_NONE
        this.customTileSize = size

        return this
    }

    setBackground(texture) {
        this.background = new Sprite(texture)
        this.addChild(this.background)

        return this
    }

    updateSizes() {
        if(!this.parent)
            return

        this.tileSize = this.customTileSize || this.parent.tileSize || 0

        if(this.fitMode) {
            this[this.fitMode] = this.parent[this.fitMode]
            this.tileSize = Math.floor(this[this.fitMode] / this.sizesByTilling[this.fitMode])
        }

        this.position = this.positionByTilling.multiplyScalar(this.tileSize)
        this.width = this.sizesByTilling.width * this.tileSize
        this.height = this.sizesByTilling.height * this.tileSize

        if(this.background) {
            this.background.width = this.width
            this.background.height = this.height
        }
    }
}

export { Grid } 