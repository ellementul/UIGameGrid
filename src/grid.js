// import { Box } from './box.js'
import { CellComponent } from './components/cell_component.js'

const BASE_LENGTH = 20

class Grid extends Map {
    constructor(baseLength) {
        super()

        this.baseLength = baseLength || BASE_LENGTH
        this.cellSizes = {}

        this.drawGrid()
        this.computeCells()

        window.addEventListener("resize", () => {
            this.computeCells()
            this.updateCellSize()
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
        
        this.debugCells = new Map

        for (let x = 0; x < this.otherLength; x++) {
            for(let y = 0; y < this.baseLength; y++) {

                const cell = new CellComponent("Cell" + x + "_" + y, this.cellSizes)
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

    computeCells() {
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.element.style.width = sizes.width
        this.element.style.height = sizes.height

        const baseSide = sizes.height < sizes.width ? "height" : "width"
        const otherSide = sizes.height < sizes.width ? "width" : "height"

        this.cellSizes[baseSide] = sizes[baseSide] / this.baseLength

        this.otherLength = Math.floor(sizes[otherSide] / this.cellSizes[baseSide])

        this.cellSizes[otherSide] = sizes[otherSide] / this.otherLength
    }

    updateCellSize() {
        for (const [_, cell] of this.debugCells) {
            cell.updateCellSize(this.cellSizes)
        }
    }
}

export { Grid }