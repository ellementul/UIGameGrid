import { NONE_MODE, WIDTH_MODE, HEIGHT_MODE } from "./consts.js"
import { TillingBackgroundMixin } from "./background.js"
import { Container, Point } from "pixi.js"

class Grid extends Container {
    constructor() {
        super()

        this.isTillingGrid = true

        Object.assign(this, new TillingBackgroundMixin)
        
        this.tileSize = 1
        this.subTilling = 1
        this.tillingSizes = {}
        this.tillingSizes.width = 1
        this.tillingSizes.height = 1
        this.tillingPosition = new Point

        this.cache = {
            width : 0,
            height : 0,
            x : 0,
            y : 0,
            tileSize : 0,
            subTilling: 1
        }

        this.onRender = () => this.updateSizes()
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTillingGrid)
            return

        this.tileSize = this.parent.tileSize / this.subTilling

        if(this.cache.width == this.tillingSizes.width
            && this.cache.height == this.tillingSizes.height
            && this.cache.x == this.tillingPosition.x
            && this.cache.y == this.tillingPosition.y
            && this.cache.tileSize == this.tileSize
            && this.cache.subTilling == this.subTilling
        )
            return

        this.cache.width = this.tillingSizes.width
        this.cache.height = this.tillingSizes.height
        this.cache.x = this.tillingPosition.x
        this.cache.y = this.tillingPosition.y
        this.cache.tileSize = this.tileSize
        this.cache.subTilling = this.subTilling

        this.position.set(this.tillingPosition.x * this.parent.tileSize, this.tillingPosition.y * this.parent.tileSize)

        this.updateBackground()

        this.children.forEach(child => {
            if(typeof child.updateSizes == "function")
                child.updateSizes()
        })
    }
}

export { Grid } 