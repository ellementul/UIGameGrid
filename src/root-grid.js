import { Container } from "pixi.js"
import { CompositeTilemap } from "@pixi/tilemap"


const WIDTH_MODE = "width"
const HEIGHT_MODE = "height"
const MIN_SUBDIVIDE = 16
const MAX_SUBDIVIDE = 64

const clampSubdiv = (subdivideLevel) => Math.min(Math.max(subdivideLevel, MIN_SUBDIVIDE), MAX_SUBDIVIDE)

class RootGrid extends Container {
    constructor(app) {
        super()

        this.app = app
        this.screenWidth = this.app.screen.width
        this.screenHeight = this.app.screen.height
        this.worldWidth = this.screenWidth
        this.worldHeight = this.screenHeight
        this.fitMode = HEIGHT_MODE
        this.subdivideLevel = MIN_SUBDIVIDE

        this.tileMap = new CompositeTilemap
        this.addChild(this.tileMap)
        this.worldTileSize = 32
        this.screenTileSize = 32
        
        this.updateSizes()

        window.addEventListener('resize', () => this.updateSizes())
    }

    setSubdivide(fitMode, subdivideLevel) {
        this.fitMode = fitMode || HEIGHT_MODE
        this.subdivideLevel = clampSubdiv(subdivideLevel || 1)
        this.updateSizes()
    }

    setBackgroundTiles(texture) {
        this.worldTileSize = texture.width > texture.height ? texture.height : texture.width
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
        this.screenWidth = this.app.screen.width
        this.screenHeight = this.app.screen.height

        if(this.fitMode === WIDTH_MODE) {
            this.screenTileSize = this.screenWidth / this.subdivideLevel

            this.worldWidth = this.subdivideLevel * this.worldTileSize
            this.worldHeight = Math.floor(this.screenHeight / this.screenTileSize) * this.worldTileSize
        }
        
        if(this.fitMode === HEIGHT_MODE) {
            this.screenTileSize = this.screenHeight / this.subdivideLevel
            
            this.worldWidth = Math.floor(this.screenWidth / this.screenTileSize) * this.worldTileSize
            this.worldHeight = this.subdivideLevel * this.worldTileSize
        }

        this.tileMap.scale = { 
            x: this.screenWidth / this.worldWidth, 
            y: this.screenHeight / this.worldHeight
        }

        // Update children
        if(this.background && (this.background.width !== this.worldWidth || this.background.height !== this.worldHeight))
            this.updateTilling()
    }
}

export { RootGrid }