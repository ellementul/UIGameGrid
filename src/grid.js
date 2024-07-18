import { NONE_MODE, WIDTH_MODE, HEIGHT_MODE } from "./consts.js"
import { SetBgMixin } from "./backgrounds/bg-mixin.js"
import { Container, Graphics, Point, Texture } from "pixi.js"
import { SpriteBg } from "./backgrounds/sprite-background.js"

class Grid extends Container {
    constructor() {
        super()

        this.isTillingGrid = true

        this.tileSize = 1
        this.subTilling = 1
        this.tillingSizes = new Point(1, 1)
        this.tillingPosition = new Point

        this.cache = {
            width : 0,
            height : 0,
            x : 0,
            y : 0,
            tileSize : 0,
            subTilling: 1
        }

        this.on('added', () => this.updateSizes(), this)
        this.onRender = () => this.updateSizes()

        this.mask = new SpriteBg(Texture.WHITE)
        this.addChild(this.mask)

        SetBgMixin(this)
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTillingGrid)
            return

        this.tileSize = this.parent.tileSize / this.subTilling

        if(this.cache.width == this.tillingSizes.x
            && this.cache.height == this.tillingSizes.y
            && this.cache.x == this.tillingPosition.x
            && this.cache.y == this.tillingPosition.y
            && this.cache.tileSize == this.tileSize
            && this.cache.subTilling == this.subTilling
        )
            return

        this.cache.width = this.tillingSizes.x
        this.cache.height = this.tillingSizes.y
        this.cache.x = this.tillingPosition.x
        this.cache.y = this.tillingPosition.y
        this.cache.tileSize = this.tileSize
        this.cache.subTilling = this.subTilling

        this.position.set(this.tillingPosition.x * this.parent.tileSize, this.tillingPosition.y * this.parent.tileSize)

        this.children.forEach(child => child.isTillingGrid && child.updateSizes())
    }
}

export { Grid } 