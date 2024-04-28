import { SubComponent } from "./sub_component.js"

const WIDTH = "width"
const HEIGHT = "height"
const X_AXIS = "x"
const Y_AXIS = "y"
const DEFAULT_SUBDIVIDE = 3

class GridComponent extends SubComponent {
    constructor (options) {
        super(options)

        this.baseLength = options.subdivideLevel || DEFAULT_SUBDIVIDE

        this.cell = { sizes: {} }
        this.computeCells()
    }

    showDebugGrid() {
        if(!this.debugGrid)
            this.debugGrid = new GridDebug({ 
                parent: this, 
                name: "gridDebug",
                subdivideLevel: this.baseLength
            })
    }

    hideDebugGrid() { 
        if(this.debugGrid) {
            this.debugGrid.destructor()
            this.debugGrid = false
        }
    }

    computeCells() {
        const sizes = {
            [WIDTH]: this.parent.widthPx,
            [HEIGHT]: this.parent.heightPx
        }

        this.setWidth(sizes[WIDTH])
        this.setHeight(sizes[HEIGHT])

        this.mainAxis   = sizes[HEIGHT] < sizes[WIDTH] ? Y_AXIS : X_AXIS
        const baseSide  = sizes[HEIGHT] < sizes[WIDTH] ? HEIGHT : WIDTH
        const otherSide = sizes[HEIGHT] < sizes[WIDTH] ? WIDTH  : HEIGHT

        this.cell.sizes[baseSide] = sizes[baseSide] / this.baseLength

        this.otherLength = Math.floor(sizes[otherSide] / this.cell.sizes[baseSide])

        this.cell.sizes[otherSide] = sizes[otherSide] / this.otherLength
    }

    updateSize() {
        this.computeCells()

        super.updateSize()
    }
}

class GridDebug extends GridComponent {
    constructor(options) {
        super(options)
        this.draw()
    }

    draw() {
        const xLimit = this.mainAxis === Y_AXIS ? this.otherLength : this.baseLength
        const yLimit = this.mainAxis === X_AXIS ? this.otherLength : this.baseLength

        for (let x = 0; x < xLimit; x++) {
            for(let y = 0; y < yLimit; y++) {

                const name = `${x}_${y}_debug_cell`
                const cell = new SubComponent({ parent: this, name })
                cell.setWidth(this.cell.sizes.width)
                cell.setHeight(this.cell.sizes.height)
                cell.setTop(y * this.cell.sizes.height)
                cell.setLeft(x * this.cell.sizes.width)


                cell.element.style.border = "1px dotted #4e150d"
                cell.element.style.color = "#4e150d"
                cell.setBgColor("#f8bb26")

                if(x == 0)
                    cell.element.textContent = y

                if(y == 0)
                    cell.element.textContent = x
            }
        }
    }

    updateSize() {
        this.clear()

        this.baseLength = this.parent.baseLength
        super.updateSize()

        this.draw()
    }
}

export { GridComponent }