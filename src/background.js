import { CompositeTilemap } from "@pixi/tilemap"
import { Graphics, Texture } from "pixi.js"

export function TillingBackgroundMixin(object) {
    return Object.assign(object, {
        setBgColor(color) {
            if(this.background)
                this.background.removeFromParent()

            this.background = new Graphics
            this.background.color = color
            this.background.isGraphics = true
            this.addChild(this.background)
        },

        setBgDebug() {
            if(this.background)
                this.background.removeFromParent()

            this.background = new Graphics
            this.background.alpha = 0.5
            this.background.scale.set(1, 1)
            this.background.isDebug = true
            this.addChild(this.background)
        },

        updateBackground() {
            if(!this.background)
                return

            if(this.background.isGraphics) {

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
        }
    })
}
            
            // updateTilling() {
            //     this.tileMap.clear()
                
            //     if(this.tileMod == ONE_TILE) {
            //         for (let y = 0; y < this.height; y += this.tileSize) {
            //             for (let x = 0; x < this.width; x += this.tileSize) {
            //                 this.tileMap.tile(this.textures[0], x, y)
            //             }
            //         }
            //     }
            // }

        // setBackgroundTiles(texture) {
        //     this.clearBackground()
        //     this.background.tileMap = new CompositeTilemap
        //     this.addChild(this.background.tileMap)

        //     this.background.textures = [texture]
        //     this.background.tileSize = texture.width > texture.height ? texture.height : texture.width
        //     this.updateSizes()
        // }