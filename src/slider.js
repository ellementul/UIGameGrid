import { Grid } from "./grid.js";

export function SliderMixin(grid, isVertical = false) {

    grid.scrollTillingOffset = 0
    grid.scrollOffsetLimit = 0

    grid.strip = new Grid({ isMask: false })

    if(isVertical)
        grid.strip.fitX = true
    else
        grid.strip.fitY = true

    grid.addChild(grid.strip)

    grid.addChild = child => grid.strip.addChild(child)

    const superUpdateSizes = grid.updateSizes.bind(grid)

    grid.updateSizes = function () {
        superUpdateSizes()

        if(grid.scrollTillingOffset < 0)
            grid.scrollTillingOffset = 0

        if(grid.scrollOffsetLimit > 0 && grid.scrollOffsetLimit < grid.scrollTillingOffset)
            grid.scrollTillingOffset = grid.scrollOffsetLimit

        const tillingOffset = Math.round(this.scrollTillingOffset)

        if(isVertical) {
            grid.strip.tillingPosition.y = tillingOffset
            grid.strip.tillingSizes.y = grid.scrollOffsetLimit
        }
        else {
            grid.strip.tillingPosition.x = tillingOffset
            grid.strip.tillingSizes.x = grid.scrollOffsetLimit
        }
    }

    grid.eventMode = "static"
    grid.on('wheel', event => {
        event.stopPropagation()
        
        grid.scrollTillingOffset += event.deltaY * 0.01
    })

    return grid
}

export function VerticalSlider() {
    return SliderMixin(new Grid, true)
}

export function HorizontalSlider() {
    return SliderMixin(new Grid, false)
}
