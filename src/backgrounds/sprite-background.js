import { Sprite, Texture } from "pixi.js"

export class SpriteBg extends Sprite {
    constructor() {
        super(...arguments)

        this.isTilling = true
        this.isBackground = true

        this.on('added', () => this.updateSizes())
    }

    fillColor(color) {
        this.texture = Texture.WHITE
        this.tint = color
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTilling)
            return

        this.scale.set(
            (this.parent.tillingSizes.x * this.parent.tileSize) / this.texture.width,
            (this.parent.tillingSizes.y * this.parent.tileSize) / this.texture.height
        )
    }
}