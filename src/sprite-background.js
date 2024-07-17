import { Sprite } from "pixi.js"

export class SpriteBg extends Sprite {
    constructor() {
        super(...arguments)

        this.isTillingGrid = true
        this.isBackground = true

        this.on('added', () => this.updateSizes())
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTillingGrid)
            return

        this.scale.set(
            (this.parent.tillingSizes.x * this.parent.tileSize) / this.texture.width,
            (this.parent.tillingSizes.y * this.parent.tileSize) / this.texture.height
        )
    }
}