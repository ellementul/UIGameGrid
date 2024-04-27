import { Box } from './box.js'

const BASE_LENGTH = 20

class Grid extends Map {
    constructor(baseLength) {
        super()

        this.baseLength = baseLength || BASE_LENGTH
        this.cell = {}

        this.drawGrid()
        this.computeCells()

        window.addEventListener("resize", () => {
            this.computeCells()
            this.updateBoxes()
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

    computeCells() {
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.element.style.width = sizes.width
        this.element.style.height = sizes.height

        const baseSide = sizes.height < sizes.width ? "height" : "width"
        const otherSide = sizes.height < sizes.width ? "width" : "height"

        this.cell[baseSide] = sizes[baseSide] / this.baseLength

        this.otherLength = Math.floor(sizes[otherSide] / this.cell[baseSide])

        this.cell[otherSide] = sizes[otherSide] / this.otherLength
    }

    createBox({ name, top, right, bottom, left, centred, color }) {
        name ||= "Box" + this.size

        if(this.has(name))
            throw new Error(`Box with name "${name}" is existed already!`)

        const box = new Box(name, {
            ...this.cell
        }, { 
            top, 
            right, 
            bottom, 
            left, 
            centred,
            color
        })
        this.element.appendChild(box.element)
        this.set(name, box)

        return this.get(name)
    }

    updateBoxes() {
        for (const [_, box] of this) {
            box.updateCells(this.cell)
        }
    }
}

export { Grid }