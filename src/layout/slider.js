import { Grid } from "./grid.js";

export function SliderMixin(component, isVertical = false) {

    Object.defineProperty(component, 'isVertical', { value: isVertical, writable: false })

    component.scrollTillingOffset = 0
    component.scrollOffsetLimit = 0

    component.cache.scrollOffsetLimit = 0

    component.strip = new Grid({ isMask: false })

    if(isVertical)
        component.strip.fitX = true
    else
        component.strip.fitY = true

    component.addChild(component.strip)

    component.addChild = child => component.strip.addChild(child)

    const superUpdateSizes = component.updateSizes.bind(component)

    component.updateSizes = () => {
        if(!superUpdateSizes() && component.scrollOffsetLimit == component.cache.scrollOffsetLimit)
            return

        component.cache.scrollOffsetLimit == component.scrollOffsetLimit

        if(component.scrollTillingOffset < 0)
            component.scrollTillingOffset = 0

        if(component.scrollOffsetLimit > 0 && component.scrollOffsetLimit < component.scrollTillingOffset)
            component.scrollTillingOffset = component.scrollOffsetLimit

        const tillingOffset = Math.round(component.scrollTillingOffset)

        if(isVertical) {
            component.strip.tillingPosition.y = tillingOffset
            component.strip.tillingSizes.y = component.scrollOffsetLimit
        }
        else {
            component.strip.tillingPosition.x = tillingOffset
            component.strip.tillingSizes.x = component.scrollOffsetLimit
        }

        return true
    }

    component.eventMode = "static"
    component.on('wheel', event => {
        event.stopPropagation()
        
        component.scrollTillingOffset += event.deltaY * 0.01
    })

    return component
}

export function VerticalSlider() {
    return SliderMixin(new Grid, true)
}

export function HorizontalSlider() {
    return SliderMixin(new Grid, false)
}
