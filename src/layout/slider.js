import { Grid } from "./grid.js";

export function SliderMixin(component) {

    component.isVertical = false
    component.autoPosition = false

    component.strip = new Strip
    component.addChild(component.strip)

    component.scrollTillingOffset = 0
    component.scrollOffsetLimit = 0
    component.maxPosizeItem = 0

    const superUpdateSizes = component.updateSizes.bind(component)

    component.updateSizes = function () {
        if(this.scrollTillingOffset < 0)
            this.scrollTillingOffset = 0
        
        if(this.scrollOffsetLimit < this.scrollTillingOffset)
            this.scrollTillingOffset = this.scrollOffsetLimit

        const tillingOffset = this.scrollTillingOffset

        if(this.isVertical)
            this.strip.tillingPosition.y = tillingOffset * -1
        else
            this.strip.tillingPosition.x = tillingOffset * -1

        if(!superUpdateSizes() && this.maxPosizeItem == this.strip.maxPosizeItem)
            return

        this.maxPosizeItem = this.strip.maxPosizeItem

        if(this.isVertical)
            this.scrollOffsetLimit = this.maxPosizeItem - this.tillingSizes.y
        else
            this.scrollOffsetLimit = this.maxPosizeItem - this.tillingSizes.x

        if(this.scrollOffsetLimit < 0)
            this.scrollOffsetLimit = 0

        return true
    }

    component.eventMode = "static"
    component.on('wheel', event => {
        event.stopPropagation()
        
        component.scrollTillingOffset += event.deltaY * 0.01
    })

    return component
}

class Strip extends Grid {
    constructor(options = {}) {
        options.isMask = false

        super(options)

        this.maxPosizeItem = 0
    }

    get isVertical () {
        return this.parent?.isVertical
    }

    get autoPosition() {
        return this.parent?.autoPosition
    }

    addChild () {
        const children = [...arguments].filter(child => {
            if(child.isPanel || (child.isRow && this.isVertical) || (child.isColumn && !this.isVertical)) {
                console.error("A child of slider can't be Panel, Row(vertical slider), Column(horizontal slider), because it circular dependency of tillingSize calculation ")
                return false
            }

            SliderItemMixin(child)

            return true
        })

        if(children.length > 0)
            super.addChild(...children)
    }

    updateSizes () {
        if(this.isVertical)
            this.tillingSizes.y = this.maxPosizeItem
        else
            this.tillingSizes.y = this.maxPosizeItem

        this.fitX = this.isVertical
        this.fitY = !this.isVertical

        return super.updateSizes()
    }
}

function SliderItemMixin(component) {

    let isVerticalCache = false
    let autoPositionCache = false

    Object.defineProperty(component, 'listAxis', { 
        get() { return this.parent?.isVertical ? 'y' : 'x' }
    })

    Object.defineProperty(component, 'autoPos', { 
        get() { return this.parent?.autoPosition }
    })

    const superUpdateSizes = component.updateSizes.bind(component)
    component.updateSizes = function () {
        if(this?.isGrid) {
            this.fitX = this.autoPos && this.listAxis == 'y'
            this.fitY = this.autoPos && this.listAxis != 'y'

            if(!superUpdateSizes() && (this.listAxis == 'y') == isVerticalCache && autoPositionCache == this.autoPos)
                return

            isVerticalCache = (this.listAxis == 'y')
            autoPositionCache = this.autoPos

            const posize = (this.tillingSizes[this.listAxis] / this.subTilling) + this.tillingPosition[this.listAxis]
            this.parent.maxPosizeItem = Math.max(this.parent.maxPosizeItem, posize)

            if(this.autoPos) {
                const prevItem = this.prevItem

                if(prevItem?.isGrid) {
                    if(this.listAxis == 'y') {
                        this.tillingPosition.x = 0
                        this.tillingPosition.y = prevItem.tillingPosition.y + (prevItem.tillingSizes.y / prevItem.subTilling)
                    }
                    else {
                        this.tillingPosition.x = prevItem.tillingPosition.x + (prevItem.tillingSizes.x / prevItem.subTilling)
                        this.tillingPosition.y = 0
                    }
                }
            }

            return true
        }

        return false
    }

    return component
}

export function HorizontalSlider() {
    const slider = SliderMixin(new Grid)
    return slider
}

export function VerticalSlider() {
    const slider = SliderMixin(new Grid)
    slider.isVertical = true
    return slider
}

