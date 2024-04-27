import { Component } from './components/component.js'

class Box extends Component {
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
        super(name)
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

        this.setWidth((x2 - x1) + "px")
        this.setHeight((y2 - y1) + "px")
        this.setTop(y1 + "px")
        this.setLeft(x1 + "px")
    }

    updateByCenter({ cellWidth, cellHeight }) {
        const cx = window.screen.width / 2
        const cy = window.screen.height / 2

        this.setWidth(((this.limits.left + this.limits.right) * cellWidth) + "px")
        this.setHeight(((this.limits.top + this.limits.bottom) * cellHeight) + "px")
        this.setTop((cx - this.limits.left * cellWidth) + "px")
        this.setLeft((cy - this.limits.top * cellHeight) + "px")
    }
}

export { Box }