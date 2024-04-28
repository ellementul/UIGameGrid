// import { Box } from './box.js'
import { Component } from './components/component.js'
import { CellComponent } from './components/cell_component.js'

const BASE_LENGTH = 20
const WIDTH = "width"
const HEIGHT = "height"
const X_AXIS = "x"
const Y_AXIS = "y"

class Grid {
    constructor(baseLength) {
        this.component = new Component("root")

        this.baseLength = baseLength || BASE_LENGTH
        this.component.cell = { sizes: { width: 0, height: 0 } }

        this.drawGrid()
        this.computeCells()

        window.addEventListener("resize", () => {
            this.computeCells()
            this.updateSize()
        })
    }

    drawGrid() {
        this.element = document.createElement("div")
        this.element.class = "grid"
        this.element.style.position = "absolute"
        this.element.style.top = 0
        this.element.style.left = 0
        document.body.appendChild(this.element)
    }

    showDebugCells() {

        if(this.debugCells) {
            console.warn("Debug grid is drawn already!")
            return
        }
        
        this.debugCells = new Map

        const xLimit = this.mainAxis === Y_AXIS ? this.otherLength : this.baseLength
        const yLimit = this.mainAxis === X_AXIS ? this.otherLength : this.baseLength

        for (let x = 0; x < xLimit; x++) {
            for(let y = 0; y < yLimit; y++) {

                const cell = new CellComponent("Cell" + x + "_" + y, this.component)
                cell.element.style.border = "1px dotted #4e150d"
                cell.element.style.color = "#4e150d"
                cell.setBgColor("#f8bb26")
                cell.setTop(y)
                cell.setLeft(x)
                this.element.appendChild(cell.element)

                const name = `${x}_${y}_debug_cell`
                this.debugCells.set(name, cell)

                if(x == 0)
                    cell.element.textContent = y

                if(y == 0)
                    cell.element.textContent = x
            }
        }
        
    }

    hideDebugCells() {
        
        if(this.debugCells)
            for (const [_, cell] of this.debugCells)
                cell.destructor()

        delete this.debugCells
    }

    computeCells() {
        const sizes = {
            [WIDTH]: window.innerWidth,
            [HEIGHT]: window.innerHeight
        }

        this.element.style.width = sizes[WIDTH]
        this.element.style.height = sizes[HEIGHT]

        this.mainAxis   = sizes[HEIGHT] < sizes[WIDTH] ? Y_AXIS : X_AXIS
        const baseSide  = sizes[HEIGHT] < sizes[WIDTH] ? HEIGHT : WIDTH
        const otherSide = sizes[HEIGHT] < sizes[WIDTH] ? WIDTH  : HEIGHT

        this.component.cell.sizes[baseSide] = sizes[baseSide] / this.baseLength

        this.otherLength = Math.floor(sizes[otherSide] / this.component.cell.sizes[baseSide])

        this.component.cell.sizes[otherSide] = sizes[otherSide] / this.otherLength
    }

    updateSize() {
        // for (const [_, subComponent] of this) {
        //     subComponent.updateSize()
        // }

        if(this.debugCells)
            this.updateDebugCells()
    }

    updateDebugCells() {
        this.hideDebugCells()
        this.showDebugCells()
    }
}

export { Grid }