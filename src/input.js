import { Sprite, Texture } from "pixi.js"
import { Input as PixiInput } from "@pixi/ui"


export class Input extends PixiInput {
    constructor(parentOptions = {}) {

        parentOptions.bg = new Sprite(Texture.EMPTY)

        if(!parentOptions.align)
            parentOptions.align = 'center'

        super(parentOptions)

        this.isTillingGrid = true
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTillingGrid)
            return

        this.bg.scale.set(
            (this.parent.tillingSizes.width * this.parent.tileSize) / this.bg.texture.width,
            (this.parent.tillingSizes.height * this.parent.tileSize) / this.bg.texture.height
        )

        this.align()
    }
}