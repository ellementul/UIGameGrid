import { Container, DEPRECATED_SCALE_MODES, Graphics, Point, Rectangle, Sprite, Texture } from "pixi.js"
import { TileMap } from "./tilemap.js"

const ONE_TILES_TYPE = "OneTilesType"
const TWO_TILES_TYPE = "OneTilesType"  
const NINE_TILES_TYPE = "NineTilesType" 

export function TillingMixin(object) {
    object = Object.assign(object, {
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

        setTillingBg(texture, type) {
            if(this.background)
                this.background.removeFromParent()

            this.background = type == NINE_TILES_TYPE ? new TillingBackground(texture) : new NineTillingBackground(texture)
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
                this.background.tillingSizes.set(this.tillingSizes.width, this.tillingSizes.height)

                this.background.updateSizes()

                this.background.scale.set(
                    this.tileSize / this.background.tileSizes.x,
                    this.tileSize / this.background.tileSizes.y
                )
            }
        }
    })

    if(typeof object.updateSizes !== "function")
        object = Object.assign(object, {

            isTillingGrid: true,
            subTilling: 1,
            tillingSizes: { width: 1, height: 1 },

            set subTilling(value) {
                this.subTilling = value
                this.updateSizes()
            },

            updateSizes () {
                if(!this.parent || !this.parent.isTillingGrid)
                    return

                this.updateTilling()

                this.updateVisible()

                this.updateBackground()
                this.updateChildrenSizes()
            },

            updateTilling() {
                this.tileSize = this.parent.tileSize / this.subTilling
                this.tillingSizes.width = this.parent.tillingSizes.width * this.subTilling
                this.tillingSizes.height = this.parent.tillingSizes.height * this.subTilling
            },

            updateVisible() {
                if(this.position.x >= this.parent.tillingSizes.width * this.parent.tileSize
                    || this.position.y >= this.parent.tillingSizes.height * this.parent.tileSize
                )
                    return this.visible = false
                else
                    this.visible = true
            },

            updateChildrenSizes() {
                this.children.forEach(child => child.isTillingGrid && child.updateSizes())
            }
        })

    object.clearBg()

    return object
}

class TillingBackground extends TileMap {
    constructor(texture) {
        super()

        texture.source.scaleMode = DEPRECATED_SCALE_MODES.NEAREST

        this.texture = texture
        this.tileSizes.set(texture.width, texture.height)

        this.tillingSizes = new Point(1, 1)
    }

    updateSizes() {
        this.clear()

        for (let y = 0; y < this.tillingSizes.y; y++) {
            for (let x = 0; x < this.tillingSizes.x; x++) {
                this.set({x, y}, this.texture)
            }
        }
    }
}

class NineTillingBackground extends TileMap {
    constructor(texture) {
        super()

        const source = texture.source
        source.scaleMode = DEPRECATED_SCALE_MODES.NEAREST
        this.sliceAtlas(source, new Point(3, 3))
        
        this.tillingSizes = new Point(1, 1)
    }

    updateSizes() {
        this.clear()

        for (let y = 0; y < this.tillingSizes.y; y++) {
            for (let x = 0; x < this.tillingSizes.x; x++) {
                const frame = new Point(this.calcBound(x, this.tillingSizes.x), this.calcBound(y, this.tillingSizes.y))
                this.set({x, y}, this.atlas.frames[frame.y][frame.x])
            }
        }
    }

    calcBound(coord, limit) {
        if(coord == 0)
            return 0
    
        if(coord + 1 == limit)
            return 2
    
        return 1
    }
}

