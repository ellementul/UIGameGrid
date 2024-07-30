import { Grid } from "./grid.js";

export class Column extends Grid {
    constructor() {
        super()

        this.partSize = 0.5
        this.columnNumber = 0
        this.fitY = true
    }

    updateSizes() {
        if(!this.visible || !this.parent || !this.parent.isTilling)
            return

        this.tillingSizes.x = this.parent.tillingSizes.x * this.partSize * this.subTilling
        this.tillingPosition.x = this.tillingSizes.x * this.partSize * this.columnNumber

        return super.updateSizes()
    }
}