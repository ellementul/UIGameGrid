import { Grid } from "./grid.js";
import { SliderMixin } from "./slider.js";

export function DynamicListMixin(component, isVertical) {
    SliderMixin(component, isVertical)

    const sliderAddChild = component.addChild.bind(component)
    component.addChild = child => {
        ListItemMixin(child, component.isVertical)
        sliderAddChild(child)
    }

    const sliderUpdateSizes = component.updateSizes.bind(component)
    component.updateSizes = () => {

        const lastChild = component.children[component.children.length - 1]

        if(lastChild) {
            if(component.isVertical)
                component.scrollOffsetLimit = lastChild.tillingPosition.y + lastChild.tillingSizes.y
            else
                component.scrollOffsetLimit = lastChild.tillingPosition.x + lastChild.tillingSizes.x
        }
        else
            component.scrollOffsetLimit = 1

        return sliderUpdateSizes()
    }
}

function ListItemMixin(component, isVertical) {
    if(!component.isGrid)
        throw new TypeError("Component in List has to be Grid!")

    component.getPrevItem = () => {
        if(!component.parent)
            return

        const index = component.parent.children.indexOf(component)

        return component.parent.children[index - 1]
    }

    const itemUpdateSizes = component.updateSizes.bind(component)
    component.updateSizes = () => {
        const prevItem = component.getPrevItem()

        if(prevItem && prevItem.isGrid) {
            if(isVertical)
                component.tillingPosition.y = prevItem.tillingPosition.y + (prevItem.tillingSizes.y / prevItem.subTilling)
            else
                component.tillingPosition.x = prevItem.tillingPosition.x + (prevItem.tillingSizes.x / prevItem.subTilling)
        }

        return itemUpdateSizes()
    }
}

export function DynamicList() {
    return DynamicListMixin(new Grid)
}