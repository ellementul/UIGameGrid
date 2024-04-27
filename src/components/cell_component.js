import { Component } from "./component.js"

class CellComponent extends Component {
    constructor (name, cellSizes ) {
        super(name)

        this.cellSizes = cellSizes
        this.left = 0
        this.top = 0
        this.width = 1
        this.height = 1

        this.updateCellSize(cellSizes)
    }

    setWidth(width) {
        this.width = width
        super.setWidth(this.width * this.cellSizes.width)
    }

    setHeight(height) {
        this.height = height
        super.setHeight(this.height * this.cellSizes.height)
    }

    setTop(top) {
        this.top = top
        super.setTop(this.top * this.cellSizes.height)
    }

    setLeft(left) {
        this.left = left
        super.setLeft(this.left * this.cellSizes.width)
    }

    updateCellSize(cellSizes) {
        cellSizes ||= this.cellSizes
        
        super.setWidth( this.width  * cellSizes.width)
        super.setHeight(this.height * cellSizes.height)
        super.setTop(   this.top    * cellSizes.height)
        super.setLeft(  this.left   * cellSizes.width)
    }
}

export { CellComponent }