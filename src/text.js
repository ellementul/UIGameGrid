import { BitmapText as PixiText } from "pixi.js";

export function Text(options) {

    const text = new PixiText(options)

    const { style: { fontSize } } = options

    text.isTilling = true
    text.anchor.set(0.5)


    text.updateSizes = (function () {
        if(!this.parent || !this.parent.isTilling)
            return

        if(!fontSize)
            this.style.fontSize = this.parent.tileSize * 0.8

        this.style.wordWrap = true
        this.style.wordWrapWidth = this.parent.tillingSizes.x * this.parent.tileSize

        this.position.set(
            this.parent.tillingSizes.x * this.parent.tileSize * this.anchor.x, 
            this.parent.tillingSizes.y * this.parent.tileSize * this.anchor.y
        )
    }).bind(text)

    return text
}