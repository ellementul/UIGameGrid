import { BitmapText as PixiText } from "pixi.js";

export class Text extends PixiText {
    constructor(parentOptions) {
        super(parentOptions)

        this.isTillingGrid = true
        this.anchor.set(0.5)
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTillingGrid)
            return

        this.style.wordWrap = true
        this.style.wordWrapWidth = this.parent.tillingSizes.width * this.parent.tileSize

        
        this.position.set(
            this.parent.tillingSizes.width * this.parent.tileSize * this.anchor.x, 
            this.parent.tillingSizes.height * this.parent.tileSize * this.anchor.y
        )
    }
}