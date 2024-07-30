import { Grid } from "./grid.js";

export class Row extends Grid {
    constructor() {
        super()

        this.partSize = 0.5
        this.rowNumber = 0
        this.fitX = true
    }

    updateSizes() {
        if(!this.visible || !this.parent || !this.parent.isTilling)
            return

        this.tillingSizes.y = this.parent.tillingSizes.y * this.partSize * this.subTilling
        this.tillingPosition.y = this.tillingSizes.y * this.partSize * this.rowNumber

        return super.updateSizes()
    }
}