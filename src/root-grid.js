import { Container, Point } from "pixi.js"

import { WIDTH_MODE, HEIGHT_MODE } from "./consts.js"
import { SetBgMixin } from "./backgrounds/bg-mixin.js"

const MIN_SUBDIVIDE = 16
const MAX_SUBDIVIDE = 64

const clampSubdiv = (subdivideLevel) => Math.min(Math.max(subdivideLevel, MIN_SUBDIVIDE), MAX_SUBDIVIDE)

class RootGrid extends Container {
    constructor(app) {
        super()

        this.isTillingGrid = true

        this.app = app

        this.fitMode = HEIGHT_MODE
        this.subdivideLevel = MIN_SUBDIVIDE
        this.cacheSubdivideLevel = 0

        this.tileSize = 1

        this.tillingSizes = new Point(MIN_SUBDIVIDE, MIN_SUBDIVIDE)
        this.cacheWidth = 0
        this.cacheHeight = 0

        this.onRender = () => this.updateSizes()

        SetBgMixin(this)
    }

    updateSizes() {
        const width = this.app.screen.width
        const height = this.app.screen.height

        if(width == this.cacheWidth && height == this.cacheHeight && this.subdivideLevel == this.cacheSubdivideLevel)
            return
        
        this.cacheWidth = width
        this.cacheHeight = height
        this.cacheSubdivideLevel = this.subdivideLevel

        if(this.fitMode === WIDTH_MODE) {
            this.tileSize = width / this.subdivideLevel
            this.tillingSizes.x = this.subdivideLevel
            this.tillingSizes.y = Math.floor(height / this.tileSize)
            this.scale.set(1, height / (this.tillingSizes.y * this.tileSize))
        }

        if(this.fitMode === HEIGHT_MODE) {
            this.tileSize = height / this.subdivideLevel
            this.tillingSizes.x = Math.floor(width / this.tileSize)
            this.tillingSizes.y = this.subdivideLevel
            this.scale.set(width / (this.tillingSizes.x * this.tileSize), 1)
        }

        this.children.forEach(child => child.isTillingGrid && child.updateSizes())
    }

    setSubdivide(subdivideLevel, fitMode) {
        this.fitMode = fitMode || HEIGHT_MODE
        this.subdivideLevel = clampSubdiv(subdivideLevel || 1)
    }
}

export { RootGrid }