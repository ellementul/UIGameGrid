import { validationColor, randomColor } from './color.js'

class Component {
    constructor (name) {
        this.element = document.createElement("div")
        this.element.id = name
        this.element.style.position = "absolute"
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
        this.element.style.width = width + "px"
    }

    setHeight(height) {
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