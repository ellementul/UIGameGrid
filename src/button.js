import { Grid } from "./layout/grid.js"

export function ButtonMixin(component) {
    
    component.eventMode = "static"
    component.on('click', event => {
        if(typeof component.onPress == "function")
            component.onPress(event)
    })

    return component
} 

export function Button() {
    return ButtonMixin(new Grid())
} 