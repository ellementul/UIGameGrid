import { SubComponent } from "./sub_component.js"
import { GridComponent } from "./grid_component.js"

class CellComponent extends SubComponent {
    constructor (options, gridComponent) {

        const { parent } = options

        //TODO Interface checking in js
        // if(!(parent instanceof CellComponent || parent instanceof GridComponent))
        //     throw TypeError("The subComponent has to be CellComponent instance for Grid!")

        super(options)

        this.left = 0
        this.top = 0
        this.width = 1
        this.height = 1

        this.updateSize()
    }

    setWidth(width) {
        this.width = width
        super.setWidth(this.width * this.cell.sizes.width)
    }

    setHeight(height) {
        this.height = height
        super.setHeight(this.height * this.cell.sizes.height)
    }

    setTop(top) {
        this.top = top
        super.setTop(this.top * this.cell.sizes.height)
    }

    setLeft(left) {
        this.left = left
        super.setLeft(this.left * this.cell.sizes.width)
    }

    updateSize() {
        this.cell = this.parent.cell
        
        super.setWidth( this.width  * this.cell.sizes.width)
        super.setHeight(this.height * this.cell.sizes.height)
        super.setTop(   this.top    * this.cell.sizes.height)
        super.setLeft(  this.left   * this.cell.sizes.width)
    }
}

export { CellComponent }