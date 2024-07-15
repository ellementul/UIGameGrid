import { CompositeTilemap } from "@pixi/tilemap"
import { DEPRECATED_SCALE_MODES, Graphics, Point, Rectangle, Sprite, Texture } from "pixi.js"

export function TillingBackgroundMixin(object) {
    object = Object.assign(object, {
        isTillingGrid: true,

        clearBg() {
            if(this.background)
                this.background.removeFromParent()

            this.background = new Sprite(Texture.EMPTY)
            this.background.isEmpty = true
            this.addChildAt(this.background, 0)
        },

        setBgColor(color) {
            if(this.background)
                this.background.removeFromParent()

            this.background = new Graphics
            this.background.color = color
            this.background.isColor = true
            this.addChildAt(this.background, 0)
        },

        setBgDebug() {
            if(this.background)
                this.background.removeFromParent()

            this.background = new Graphics
            this.background.alpha = 0.5
            this.background.scale.set(1, 1)
            this.background.isDebug = true
            this.addChildAt(this.background, 0)
        },

        setTillingBg(texture) {
            if(this.background)
                this.background.removeFromParent()

            texture.source.scaleMode = DEPRECATED_SCALE_MODES.NEAREST
            this.background = new CompositeTilemap
            this.background.atlas = texture
            this.background.tileSize = this.background.atlas.width / 3
            this.background.isTilling = true
            this.addChildAt(this.background, 0)
        },

        updateBackground() {
            if(!this.background)
                return

            if(this.background.isEmpty) {
                this.background.scale.set(
                    (this.tillingSizes.width * this.tileSize) / this.background.texture.width,
                    (this.tillingSizes.height * this.tileSize) / this.background.texture.height
                )
            }

            if(this.background.isColor) {

                this.background.scale.set(1, 1)
                this.background.clear()
                    .rect(0, 0, this.tillingSizes.width * this.tileSize, this.tillingSizes.height * this.tileSize)
                    .fill(this.background.color)
            }

            if(this.background.isDebug) {
                this.background.tileSize = this.tileSize

                this.background.clear()

                for (let y = 0; y < this.tillingSizes.height; y++) {
                    for (let x = 0; x < this.tillingSizes.width; x++) {

                        const colors = ['#ffca02', '#070602']
                        const index = (x + y) % 2

                        this.background.rect(this.background.tileSize*x, this.background.tileSize*y, this.background.tileSize, this.background.tileSize)
                            .fill(colors[index])
                    }
                }

                this.background.rect(0, 0, this.tillingSizes.width * this.background.tileSize, this.tillingSizes.height * this.background.tileSize)
                    .stroke({ color: 'yellow' })
            }

            if(this.background.isTilling) {
                const tileScale = this.tileSize / this.background.tileSize 
                this.background.scale.set(tileScale, tileScale)

                this.background.clear()

                for (let y = 0; y < this.tillingSizes.height; y++) {
                    for (let x = 0; x < this.tillingSizes.width; x++) {
                        this.background.tile(
                            this.background.atlas, 
                            x * this.background.tileSize, 
                            y * this.background.tileSize,
                            {
                                u: calcBound(x, this.tillingSizes.width) * this.background.tileSize,
                                v: calcBound(y, this.tillingSizes.height) * this.background.tileSize,
                                tileWidth: this.background.tileSize,
                                tileHeight: this.background.tileSize
                            }
                        )
                    }
                }
            }
        }
    })

    if(typeof object.updateSizes !== "function") {

            object.subTilling = 1
            object.tillingSizes = { width: 1, height: 1 }

            object.updateSizes = (function() {
                if(!this.parent || !this.parent.isTillingGrid)
                    return

                this.tileSize = this.parent.tileSize / this.subTilling
                this.tillingSizes.width = this.parent.tillingSizes.width * this.subTilling
                this.tillingSizes.height = this.parent.tillingSizes.height * this.subTilling

                if(this.position.x >= this.parent.tillingSizes.width * this.parent.tileSize
                    || this.position.y >= this.parent.tillingSizes.height * this.parent.tileSize
                )
                    return this.visible = false
                else
                    this.visible = true

                this.updateBackground()

                this.children.forEach(child => child.isTillingGrid && child.updateSizes())
        }).bind(object)
    }

    object.clearBg()

    return object
}


function calcBound(coord, limit) {
    if(coord == 0)
        return 0

    if(coord + 1 == limit)
        return 2

    return 1
}