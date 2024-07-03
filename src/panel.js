import { NONE_MODE, WIDTH_MODE, HEIGHT_MODE } from "./consts.js"
import { TillingBackgroundMixin } from "./background.js"
import { Container, Point } from "pixi.js"

class Panel extends Container {
    constructor() {
        super()

        this.isTillingGrid = true

        Object.assign(this, new TillingBackgroundMixin)
        
        this.tileSize = 1
        this.tillingSizes = {}
        this.tillingSizes.width = 1
        this.tillingSizes.height = 1
        this.tillingPosition = new Point

        this.cache = {
            width : 0,
            height : 0,
            x : 0,
            y : 0,
            tileSize : 0
        }

        this.onRender = () => this.updateSizes()
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTillingGrid)
            return

        this.tileSize = this.parent.tileSize

        if(this.cache.width == this.tillingSizes.width
            && this.cache.height == this.tillingSizes.height
            && this.cache.x == this.tillingPosition.x
            && this.cache.y == this.tillingPosition.y
            && this.cache.tileSize == this.tileSize
        )
            return

        this.cache.width = this.tillingSizes.width
        this.cache.height = this.tillingSizes.height
        this.cache.x = this.tillingPosition.x
        this.cache.y = this.tillingPosition.y
        this.cache.tileSize = this.tileSize

        this.position.set(this.tillingPosition.x * this.parent.tileSize, this.tillingPosition.y * this.parent.tileSize)

        this.updateBackground()

        this.children.forEach(child => {
            if(typeof child.updateSizes == "function")
                child.updateSizes()
        })
    }
}


// setPosizes({left = 0, top = 0, right = 0, bottom = 0}) {
//     this.posizes = { left, top, right, bottom } //Calculate real sizes in Parent Grid
//     this.updateSizes()
// }

// updatePosizes() {
//     const pWidth = this.parent.tillingSizes[WIDTH_MODE]
//     const pHeight = this.parent.tillingSizes[HEIGHT_MODE]
//     const pTileSize = this.parent.screenTileSize
    
//     const [ x, width ] = this.calcPosize(this.posizes.left, this.posizes.right, pWidth)
//     const [ y, height ] = this.calcPosize(this.posizes.top, this.posizes.bottom, pHeight)
    
//     this.position.set(x*pTileSize, y*pTileSize)
//     this.tillingSizes[WIDTH_MODE] = width
//     this.tillingSizes[HEIGHT_MODE] = height
//     this.screenWidth  = this.tillingSizes[WIDTH_MODE] * pTileSize
//     this.screenHeight = this.tillingSizes[HEIGHT_MODE] * pTileSize

//     // Update Min World sizes
//     const minTileSize = this.background.tileSize || pTileSize
//     this.background.minSizes.width = this.tillingSizes[WIDTH_MODE] * minTileSize
//     this.background.minSizes.height = this.tillingSizes[HEIGHT_MODE] * minTileSize
// }

// calcPosize(begin, end, limit) {
//     let coord
//     let size

//     if(Math.sign(begin) + Math.sign(end) < 0 || Math.sign(begin) + Math.sign(end) == 2 || (Math.sign(begin) == 0 && Math.sign(end) == 0)) {
//         coord = Math.abs(begin)
//         size = limit - Math.abs(begin + end)
//     }

//     if(Math.sign(begin) + Math.sign(end) == 1) {
//         coord = (limit - begin) * Math.sign(begin)
//         size = Math.abs(begin) + Math.abs(end)
//     }

//     if(Math.sign(begin) == -1 && Math.sign(end) == 1) {
//         coord = Math.abs(begin)
//         size = end
//     }

//     if(Math.sign(begin) == 1 && Math.sign(end) == -1) {
//         coord = (limit - begin) + end
//         size = begin
//     }
//     return [coord, size]
// }

export { Panel } 