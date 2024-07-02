import { Viewport } from "pixi-viewport"

import { NONE_MODE, WIDTH_MODE, HEIGHT_MODE } from "./consts.js"
import { BackgroundMixin } from "./background.js"

class Panel extends Viewport {
    constructor({ renderer }) {
        super({ events: renderer.events })

        this.isPanel = true

        Object.assign(this, new BackgroundMixin)

        this.minWorldWidth = this.screenWidth
        this.minWorldHeight = this.screenHeight

        
        this.screenTileSize = 32

        this.fitMode = NONE_MODE
        this.tillingSizes = {}
        this.tillingSizes[WIDTH_MODE] = 1
        this.tillingSizes[HEIGHT_MODE] = 1
        this.posizes = { left: 0, top: 0, right: 0, bottom: 0 }

        this.updateSizes()
    }

    setPosizes({left = 0, top = 0, right = 0, bottom = 0}) {
        this.posizes = { left, top, right, bottom } //Calculate real sizes in Parent Grid
        this.updateSizes()
    }

    fittingWidth(value){
        this.screenWidth = value
        this.setSubdivide(WIDTH_MODE)
    }

    fittingHeight(value){
        this.screenHeight = value
        this.setSubdivide(HEIGHT_MODE)
    }

    setSubdivide(fitMode, subdivideLevel = 0) {
        this.fitMode = fitMode || WIDTH_MODE

        if(subdivideLevel > 0)
            this.tillingSizes[this.fitMode] = subdivideLevel

        this.updateSizes()
    }

    updateSizes() {
        // Update Screen Sizes
        if(this.parent && this.parent.screenTileSize)
            this.updatePosizes()

        if(this.fitMode === WIDTH_MODE) {
            this.screenTileSize = this.screenWidth / this.tillingSizes[WIDTH_MODE]

            this.worldWidth = this.tillingSizes[WIDTH_MODE] * this.worldTileSize
            this.minWorldHeight = (this.screenHeight / this.screenTileSize) * this.worldTileSize

            if(this.minWorldHeight > this.worldHeight)
                this.worldHeight = this.minWorldHeight
        }
        
        if(this.fitMode === HEIGHT_MODE) {
            this.screenTileSize = this.screenHeight / this.tillingSizes[HEIGHT_MODE]
            
            this.minWorldWidth = (this.screenWidth / this.screenTileSize) * this.worldTileSize
            this.worldHeight = this.tillingSizes[HEIGHT_MODE] * this.worldTileSize

            if(this.minWorldWidth > this.worldWidth)
                this.worldWidth = this.minWorldWidth
        }        
        
        // Update children
        this.setBackgroundSizes(this.worldWidth, this.worldHeight)
    }

    updatePosizes() {
        const pWidth = this.parent.tillingSizes[WIDTH_MODE]
        const pHeight = this.parent.tillingSizes[HEIGHT_MODE]
        const pTileSize = this.parent.screenTileSize
        
        const [ x, width ] = this.calcPosize(this.posizes.left, this.posizes.right, pWidth)
        const [ y, height ] = this.calcPosize(this.posizes.top, this.posizes.bottom, pHeight)
        
        this.position.set(x*pTileSize, y*pTileSize)
        this.tillingSizes[WIDTH_MODE] = width
        this.tillingSizes[HEIGHT_MODE] = height
        this.screenWidth  = this.tillingSizes[WIDTH_MODE] * pTileSize
        this.screenHeight = this.tillingSizes[HEIGHT_MODE] * pTileSize

        // Update Min World sizes
        const minTileSize = this.background.tileSize || pTileSize
        this.minWorldWidth = this.tillingSizes[WIDTH_MODE] * minTileSize
        this.minWorldHeight = this.tillingSizes[HEIGHT_MODE] * minTileSize

        if(this.minWorldHeight > this.worldHeight)
            this.worldHeight = this.minWorldHeight

        if(this.minWorldWidth > this.worldWidth)
            this.worldWidth = this.minWorldWidth
    }

    calcPosize(begin, end, limit) {
        let coord
        let size

        if(Math.sign(begin) + Math.sign(end) < 0 || Math.sign(begin) + Math.sign(end) == 2 || (Math.sign(begin) == 0 && Math.sign(end) == 0)) {
            coord = Math.abs(begin)
            size = limit - Math.abs(begin + end)
        }

        if(Math.sign(begin) + Math.sign(end) == 1) {
            coord = (limit - begin) * Math.sign(begin)
            size = Math.abs(begin) + Math.abs(end)
        }

        if(Math.sign(begin) == -1 && Math.sign(end) == 1) {
            coord = Math.abs(begin)
            size = end
        }

        if(Math.sign(begin) == 1 && Math.sign(end) == -1) {
            coord = (limit - begin) + end
            size = begin
        }
        
        // if(Math.sign(begin) + Math.sign(end) == 0 && Math.sign(begin) * Math.sign(end) == 0) {
        //     coord = begin
        //     size = limit - end
        // }

        // if(Math.sign(begin) + Math.sign(end) == 0 && Math.sign(begin) * Math.sign(end) != 0) {
        //     coord = begin
        //     size = limit - end
        // }
        
        // switch(Math.sign(begin) + Math.sign(end)) {
        //     case -2:
        //         coord = begin
        //         size = limit - (begin + end)
        //         break;
        //     case -1:
        //         coord = begin === 0 ? limit + end : 0
        //         size = Math.abs(begin - end)
        //         break;
        //     case 0:
        //         coord = begin > 0 ? limit - begin : begin
        //         size = Math.abs(begin - end) || limit
        //         break;
        //     default: 
        //         coord = (limit / 2) - begin
        //         size = begin + end
        //         break;
        // }
        return [coord, size]
    }
}


export { Panel } 