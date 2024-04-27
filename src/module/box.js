import { validationColor, randomColor } from './color.js'

class Box {
    constructor(
        name, 
        cell,
        { 
            color, 
            top, 
            right, 
            bottom, 
            left, 
            centred = false 
        }
    ) {    
        this.element = document.createElement("div")
        this.element.id = name
        this.element.style.position = "absolute"
        this.setBgColor(color)

        this.limits = { top, right, bottom, left }
        this.centred = centred
        
        this.updateCells(cell)
    }

    updateCells({ width: cellWidth, height: cellHeight }) {
        if(this.centred)
            this.updateByCenter({ cellWidth, cellHeight })
        else
            this.updateSize({ cellWidth, cellHeight })
    }

    updateSize({ cellWidth, cellHeight }) {
        const x1 = this.limits.left >= 0 ? this.limits.left * cellWidth : window.screen.width + this.limits.left * cellWidth
        const x2 = this.limits.right >= 0 ? window.screen.width - this.limits.right * cellWidth : -1 * this.limits.right * cellWidth
        const y1 = this.limits.top >= 0 ? this.limits.top * cellHeight : window.screen.height + this.limits.top * cellHeight
        const y2 = this.limits.bottom >= 0 ? window.screen.height - this.limits.bottom * cellHeight : -1 * this.limits.bottom * cellHeight

        this.element.style.width = (x2 - x1) + "px"
        this.element.style.height = (y2 - y1) + "px"
        this.element.style.top = y1 + "px"
        this.element.style.left = x1 + "px"
    }

    updateByCenter({ cellWidth, cellHeight }) {
        const cx = window.screen.width / 2
        const cy = window.screen.height / 2

        this.element.style.width = ((this.limits.left + this.limits.right) * cellWidth) + "px"
        this.element.style.height = ((this.limits.top + this.limits.bottom) * cellHeight) + "px"
        this.element.style.left = (cx - this.limits.left * cellWidth) + "px"
        this.element.style.top = (cy - this.limits.top * cellHeight) + "px"
    }

    setBgColor(color) {
        if(!validationColor(color)) {
            console.warn(`This color "${color}" is not valid!`)
            color = randomColor()
            console.warn(`The color will be set up in random "${color}"`)
        }

        this.element.style.backgroundColor = color
    }

    hidden(){
        this.element.style.display = "none"
    }

    show(){
        this.element.style.display = "block"
    }
}

export { Box }