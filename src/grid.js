import { Viewport } from "pixi-viewport"
import 'pixi.js/math-extras'
import { CompositeTilemap } from "@pixi/tilemap"

const NONE_MODE = null
const WIDTH_MODE = "width"
const HEIGHT_MODE = "height"

class Grid extends Viewport {
    constructor({ renderer }) {
        super({ events: renderer.events })

        this.minWorldWidth = this.screenWidth
        this.minWorldHeight = this.screenHeight
        this.worldWidth = this.minWorldWidth
        this.worldHeight = this.minWorldHeight
        this.fit()

        this.tileMap = new CompositeTilemap
        this.addChild(this.tileMap)
        this.worldTileSize = 32
        this.screenTileSize = 32

        this.fitMode = NONE_MODE
        this.updateSizes()
    }

    set width(value){
        this.screenWidth = value
        const fitMode = this.fitMode == WIDTH_MODE ? WIDTH_MODE : NONE_MODE
        this.setSubdivide(fitMode, subdivideLevel = 1)
    }
    set height(value){
        this.screenHeight = value
        const fitMode = this.fitMode == HEIGHT_MODE ? HEIGHT_MODE : NONE_MODE
        this.setSubdivide(fitMode, subdivideLevel = 1)
    }

    setSubdivide(fitMode, subdivideLevel) {
        this.fitMode = fitMode || WIDTH_MODE
        this.subdivideLevel = subdivideLevel || 1
        this.updateSizes()
    }

    setBackgroundTiles(texture) {
        this.worldTileSize = texture.width > texture.height ? texture.height : texture.width
        const scaleSize = this.screenTileSize / this.worldTileSize

        this.scale = { x: scaleSize, y: scaleSize }
        this.background = {
            texture,
            width: 0,
            height: 0
        }

        this.updateSizes()

        return this
    }

    updateTilling(texture) {
        texture = texture || this.background.texture

        if(!texture)
            return

        this.tileMap.clear()
        for (let y = 0; y < this.worldHeight; y += this.worldTileSize) {
            for (let x = 0; x < this.worldWidth; x += this.worldTileSize) {
                this.tileMap.tile(texture, x, y)
            }
        }

        this.background = {
            texture,
            width: this.worldWidth,
            height: this.worldHeight
        }
    }

    updateSizes() {
        // Update Screen Sizes
        if(this.fitMode === WIDTH_MODE) {
            this.screenTileSize = this.screenWidth / this.subdivideLevel
            console.log(this.screenTileSize, "???")

            this.worldWidth = this.subdivideLevel * this.worldTileSize
            this.minWorldHeight = (this.screenHeight / this.screenTileSize) * this.worldTileSize
        }
        
        if(this.fitMode === HEIGHT_MODE) {
            this.screenTileSize = this.screenHeight / this.subdivideLevel
            
            this.minWorldWidth = (this.screenWidth / this.screenTileSize) * this.worldTileSize
            this.worldHeight = this.subdivideLevel * this.worldTileSize
        }
        
        // Update World Sizes
        if(this.minWorldWidth > this.worldWidth)
            this.worldWidth = this.minWorldWidth

        if(this.minWorldHeight > this.worldHeight)
            this.worldHeight = this.minWorldHeight
        
        // Update Scale beetwin Screen and World 
        if(this.screenTileSizeCache !== this.screenTileSize) {
            this.screenTileSizeCache = this.screenTileSize
            const scaleSize = this.screenTileSize / this.worldTileSize
            this.scale = { x: scaleSize, y: scaleSize }
        }

        // Update children
        if(this.background && (this.background.width !== this.worldWidth || this.background.height !== this.worldHeight))
            this.updateTilling()
    }
}

export { Grid } 