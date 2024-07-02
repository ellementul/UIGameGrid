import { Container } from "pixi.js"

import { WIDTH_MODE, HEIGHT_MODE } from "./consts.js"
import { BackgroundMixin } from "./background.js"

const MIN_SUBDIVIDE = 16
const MAX_SUBDIVIDE = 64

const clampSubdiv = (subdivideLevel) => Math.min(Math.max(subdivideLevel, MIN_SUBDIVIDE), MAX_SUBDIVIDE)

class RootGrid extends Container {
    constructor(app) {
        super()

        Object.assign(this, new BackgroundMixin)

        this.app = app
        this.screenWidth = this.app.screen.width
        this.screenHeight = this.app.screen.height

        this.fitMode = HEIGHT_MODE
        this.subdivideLevel = MIN_SUBDIVIDE

        this.screenTileSize = 32

        this.tillingSizes = {}
        this.tillingSizes[WIDTH_MODE] = 1
        this.tillingSizes[HEIGHT_MODE] = 1
        
        this.updateSizes()

        window.addEventListener('resize', () => this.updateSizes())
    }

    setSubdivide(fitMode, subdivideLevel) {
        this.fitMode = fitMode || HEIGHT_MODE
        this.subdivideLevel = clampSubdiv(subdivideLevel || 1)
        this.updateSizes()
    }

    

    updateSizes() {
        // Update Screen Sizes
        this.screenWidth = this.app.screen.width
        this.screenHeight = this.app.screen.height
        
        if(this.fitMode === WIDTH_MODE) {
            this.screenTileSize = this.screenWidth / this.subdivideLevel
            this.tillingSizes[WIDTH_MODE] = this.subdivideLevel
            this.tillingSizes[HEIGHT_MODE] = Math.floor(this.screenHeight / this.screenTileSize)
            this.scale.set(1, this.screenHeight / (this.tillingSizes[HEIGHT_MODE] * this.screenTileSize))
            this.screenHeight = this.tillingSizes[HEIGHT_MODE] * this.screenTileSize
        }

        if(this.fitMode === HEIGHT_MODE) {
            this.screenTileSize = this.screenHeight / this.subdivideLevel
            this.tillingSizes[WIDTH_MODE] = Math.floor(this.screenWidth / this.screenTileSize)
            this.tillingSizes[HEIGHT_MODE] = this.subdivideLevel
            this.scale.set(this.screenWidth / (this.tillingSizes[WIDTH_MODE] * this.screenTileSize), 1)
            this.screenWidth = this.tillingSizes[WIDTH_MODE] * this.screenTileSize
        }
        
        // Update children
        if(this.background.tileMap)
            this.setBackgroundSizes(this.tillingSizes[WIDTH_MODE] * this.background.tileSize, this.tillingSizes[HEIGHT_MODE] * this.background.tileSize)
        else
            this.setBackgroundSizes(this.screenWidth, this.screenHeight)

        this.children.forEach(child => {
            if(child.isPanel)
                child.updateSizes()
        });
    }
}

export { RootGrid }