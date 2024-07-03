import { CompositeTilemap } from "@pixi/tilemap"
import { Graphics, Texture } from "pixi.js"

export function TillingBackgroundMixin() {
    return {
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

            this.background = new CompositeTilemap
            this.background.textures = [Texture.WHITE, Texture.EMPTY]
            this.background.tileSize = this.background.textures[0].width
            this.background.isTilemap = true
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

            if(this.background.isTilemap) {

                for (let y = 0; y < this.tillingSizes.height; y++) {
                    for (let x = 0; x < this.tillingSizes.width; x++) {
                        const index = (x + y) % 2
                        const texture = this.background.textures[index]
                        this.background.tile(texture, x, y)
                    }
                }

                this.background.scale.set(
                    this.tileSize / this.background.tileSize,
                    this.tileSize / this.background.tileSize
                )
            }
        }
    }
}

 // update() {
            //     if(this.minSizes.height > this.height)
            //         this.height = this.minSizes.height

            //     if(this.minSizes.width > this.width)
            //         this.width = this.minSizes.width

            //     if(this.tileMap)
            //         this.updateTilling()

            //     if(this.graph)
            //         this.graph.clear()
            //             .rect(0, 0, this.width, this.height)
            //             .fill(this.color)
            // },
            
            // updateTilling() {
            //     this.tileMap.clear()
                
            //     if(this.tileMod == ONE_TILE) {
            //         for (let y = 0; y < this.height; y += this.tileSize) {
            //             for (let x = 0; x < this.width; x += this.tileSize) {
            //                 this.tileMap.tile(this.textures[0], x, y)
            //             }
            //         }
            //     }
            //     if(this.tileMod == TWO_TILE) {
            //         for (let y = 0; y < this.height; y += this.tileSize) {
            //             for (let x = 0; x < this.width; x += this.tileSize) {
            //                 const index = (x + y) % 2
            //                 const texture = this.textures[index]
            //                 this.tileMap.tile(texture, x, y)
            //             }
            //         }
            //     }
            // }


            // setBackgroundDebug() {
        //     this.clearBackground()
        //     this.background.tileMap = new CompositeTilemap
        //     this.addChild(this.background.tileMap)

        //     this.background.tileMod = TWO_TILE
        //     this.background.textures = [Texture.WHITE, Texture.EMPTY]
        //     this.background.tileSize = this.background.textures[0].width
        //     this.updateSizes()
        // },

        // setBackgroundColor(color) {
        //     this.clearBackground()

        //     this.background.color = color || this.background.color

        //     this.background.graph = new Graphics
        //     this.addChild(this.background.graph)
        //     this.updateSizes()
        // },

        // setBackgroundTiles(texture) {
        //     this.clearBackground()
        //     this.background.tileMap = new CompositeTilemap
        //     this.addChild(this.background.tileMap)

        //     this.background.textures = [texture]
        //     this.background.tileSize = texture.width > texture.height ? texture.height : texture.width
        //     this.updateSizes()
        // },

        // clearBackground() {
        //     if(this.background.tileMap) {
        //         this.background.tileMap.removeFromParent()
        //         this.background.tileMap.destroy()
        //     }
        //     if(this.background.graph) {
        //         this.background.graph.removeFromParent()
        //         this.background.graph.destroy()
        //     }
        // },

        // setBackgroundSizes(width, height, minWidth, minHeight) {
            
        //     minWidth ||= this.background.minSizes.width
        //     minHeight ||= this.background.minSizes.height
        //     this.background.minSizes = {
        //         width: minWidth,
        //         height: minHeight
        //     }

        //     this.background.width = Math.max(width, this.background.minSizes.width)
        //     this.background.height = Math.max(height, this.background.minSizes.height)

        //     this.updateBackground()
        // },

        // updateBackground() {
        //     if(this.background.tileMap) {
        //         this.background.tileMap.scale = { 
        //             x: this.screenWidth / this.background.width, 
        //             y: this.screenHeight / this.background.height
        //         }
        //     }
            
            
        //     this.background.update()
        // }