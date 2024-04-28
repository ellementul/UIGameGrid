// import { Box } from './box.js'
import { Component } from './components/component.js'
import { CellComponent } from './components/cell_component.js'
import { GridComponent } from './components/grid_component.js'

const BASE_LENGTH = 20
const WIDTH = "width"
const HEIGHT = "height"
const X_AXIS = "x"
const Y_AXIS = "y"
const DEFAULT_SUBDIVIDE_MAIN_GRID = 20

class GridFactory {
    constructor(baseLength) {
        this.baseLength = baseLength || BASE_LENGTH
        
        this.component = new Component()
        this.component.setTop(0)
        this.component.setLeft(0)

        this.grid = new GridComponent({ 
            parent: this.component, 
            name: "mainGrid",
            subdivideLevel: DEFAULT_SUBDIVIDE_MAIN_GRID
        })

        this.updateSize()
        

        window.addEventListener("resize", () => {
            this.updateSize()
        })
    }

    computeSize() {
        const sizes = {
            [WIDTH]: window.innerWidth,
            [HEIGHT]: window.innerHeight
        }

        this.component.setWidth(sizes[WIDTH])
        this.component.setHeight(sizes[HEIGHT])
    }

    updateSize() {
        this.computeSize()

        this.grid.updateSize()
    }
}

export { GridFactory }