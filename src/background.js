import { CompositeTilemap } from "@pixi/tilemap"
import { Graphics, Texture } from "pixi.js"

const ONE_TILE = "OneTile"
const TWO_TILE = "TwoTile"

export function BackgroundMixin() {
    return {
        background: {
            textures: [],
            tileSize: 0,
            tileMod: ONE_TILE,
            width: 0,
            height: 0,

            update() {
                if(this.tileMap)
                    this.updateTilling()

                if(this.graph)
                    this.graph
                        .rect(0, 0, this.width, this.height)
                        .fill(0xff0000)
            },
            
            updateTilling() {
                this.tileMap.clear()
                
                if(this.tileMod == ONE_TILE) {
                    for (let y = 0; y < this.height; y += this.tileSize) {
                        for (let x = 0; x < this.width; x += this.tileSize) {
                            this.tileMap.tile(this.textures[0], x, y)
                        }
                    }
                }
                if(this.tileMod == TWO_TILE) {
                    for (let y = 0; y < this.height; y += this.tileSize) {
                        for (let x = 0; x < this.width; x += this.tileSize) {
                            const index = (x + y) % 2
                            const texture = this.textures[index]
                            this.tileMap.tile(texture, x, y)
                        }
                    }
                }
            }
        },

        setBackgroundDebug() {
            this.clearBackground()
            this.background.tileMap = new CompositeTilemap
            this.addChild(this.background.tileMap)

            this.background.tileMod = TWO_TILE
            this.background.textures = [Texture.WHITE, Texture.EMPTY]
            this.background.tileSize = this.background.textures[0].width
            this.updateSizes()
        },

        setBackgroundColor() {
            this.clearBackground()
            this.background.graph = new Graphics
            this.addChild(this.background.graph)
            this.updateSizes()
        },

        setBackgroundTiles(texture) {
            this.clearBackground()
            this.background.tileMap = new CompositeTilemap
            this.addChild(this.background.tileMap)

            this.background.textures = [texture]
            this.background.tileSize = texture.width > texture.height ? texture.height : texture.width
            this.updateSizes()
        },

        clearBackground() {
            if(this.background.tileMap) {
                this.background.tileMap.removeFromParent()
                this.background.tileMap.destroy()
            }
            if(this.background.graph) {
                this.background.graph.removeFromParent()
                this.background.graph.destroy()
            }
        },

        setBackgroundSizes(width, height) {
            this.background.width = width
            this.background.height = height

            if(this.background.tileMap)
                this.background.tileMap.scale = { 
                    x: this.screenWidth / width, 
                    y: this.screenHeight / height
                }

            this.background.update()
        }
    }
}