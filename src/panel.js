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

    updateSizes() {
        if(!this.parent || !this.parent.isTillingGrid)
            return
        
        const [ x, width ] = this.calcPosize(this.posizes.left, this.posizes.right, this.parent.tillingSizes.width)
        const [ y, height ] = this.calcPosize(this.posizes.top, this.posizes.bottom, this.parent.tillingSizes.height)
        
        this.tillingPosition.set(x, y)
        this.tillingSizes = { 
            width: width * this.subTilling, 
            height: height * this.subTilling
        }

        super.updateSizes()
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
        return [coord, size]
    }
}

export { Panel }