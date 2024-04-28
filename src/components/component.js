import { AbstractComponent } from './abstract_component.js'
import { validationColor, randomColor } from './color.js'

class Component extends AbstractComponent {
    constructor ({ element = null, parent = null } = {}) {
        super()

        if(parent) {
            this.element = document.createElement("div")
            parent.element.appendChild(this.element)
        }
        else if(element instanceof HTMLElement ) {
            this.element = element
        }
        else {
            this.element = document.body 
        }

        this.element.style.position = "absolute"

        this.left = 0
        this.top = 0
        this.width = 0
        this.height = 0
        this.widthPx = 0
        this.heightPX = 0
    }

    destructor() {
        this.element.remove()
    }

    setBgColor(color) {
        if(!validationColor(color)) {
            console.warn(`This color "${color}" is not valid!`)
            color = randomColor()
            console.warn(`The color will be set up in random "${color}"`)
        }

        this.element.style.backgroundColor = color
    }

    setWidth(width) {
        this.widthPx = width
        this.element.style.width = width + "px"
    }

    setHeight(height) {
        this.heightPx = height
        this.element.style.height = height + "px"
    }

    setTop(top) {
        this.element.style.top = top + "px"
    }

    setLeft(left) {
        this.element.style.left = left + "px"
    }

    hidden(){
        this.element.style.display = "none"
    }

    show(){
        this.element.style.display = "block"
    }
}

export { Component }