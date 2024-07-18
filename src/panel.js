import { Grid } from "./grid.js"

class Panel extends Grid {
    constructor() {
        super()

        this.posizes = {
            left: 1,
            right: 1,
            top: 1,
            bottom: 1
        }
    }

    resetPosizes() {
        this.posizes.left = 0
        this.posizes.right = 0
        this.posizes.top = 0
        this.posizes.bottom = 0
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTilling)
            return
        
        const [ x, width ] = this.calcPosize(this.posizes.left, this.posizes.right, this.tillingSizes.x, this.parent.tillingSizes.x)
        const [ y, height ] = this.calcPosize(this.posizes.top, this.posizes.bottom, this.tillingSizes.x, this.parent.tillingSizes.y)
        
        this.tillingPosition.set(x, y)
        this.tillingSizes.set(width, height)

        super.updateSizes()
    }

    calcPosize(begin, end, size, limit) {
        let coord
    
        if(Math.sign(begin) == 0 && Math.sign(end) == 0) {
            coord = ((limit / 2) - ((size / this.subTilling) / 2))
        }

        if(Math.sign(begin) + Math.sign(end) < 0 || Math.sign(begin) + Math.sign(end) == 2) {
            coord = Math.abs(begin)
            size = (limit - Math.abs(begin + end)) * this.subTilling
        }
    
        if(Math.sign(begin) + Math.sign(end) == 1) {
            coord = (limit - begin) * Math.sign(begin)
            size = (Math.abs(begin) + Math.abs(end)) * this.subTilling
        }
    
        if(Math.sign(begin) == -1 && Math.sign(end) == 1) {
            coord = Math.abs(begin)
            size = end * this.subTilling
        }
    
        if(Math.sign(begin) == 1 && Math.sign(end) == -1) {
            coord = (limit - begin) + end
            size = begin * this.subTilling
        }
        return [coord, size]
    }
}

export { Panel }