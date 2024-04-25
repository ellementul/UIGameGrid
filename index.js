class Grid extends Map {
  constructor(baseLength) {
    super()

    this.baseLength = baseLength || 20
    this.cell = {
      height: 0,
      width: 0
    }

    this.computeCells()

    window.addEventListener("resize", () => {
      this.computeCells()
      this.updateBoxes()
    })
  }

  computeCells() {
    const baseSide = window.screen.height < window.screen.width ? "height" : "width"
    const otherSide = window.screen.height < window.screen.width ? "width" : "height"
 
    this.cell[baseSide] = window.screen[baseSide] / this.baseLength
 
    this.cell[otherSide] = window.screen[otherSide] / Math.floor(window.screen[otherSide] / this.cell[baseSide])
  }

  createBox({ name, top, right, bottom, left, centred }) {
    name ||= "Box" + this.size
    if(this.has(name))
      throw new Error(`Box with name "${name}" is existed already!`)

    this.set(name, new Box(name, { 
      cellWidth: this.cell.width,
      cellHeight: this.cell.height
    }, { 
      top, 
      right, 
      bottom, 
      left, 
      centred
    }))

    return this.get(name)
  }

  updateBoxes() {
    for (const [name, box] of this) {
      box.updateSize({
        cellWidth: this.cell.width,
        cellHeight: this.cell.height
      })
    }
  }
}

class Box {
  constructor(name, { cellWidth, cellHeight }, { top, right, bottom, left, centred = false }) {
    this.element = document.createElement("div")
    this.element.id = name
    this.element.style.position = "absolute"
    this.limits = { top, right, bottom, left }
    this.centred = centred
    document.body.appendChild(this.element)

    this.updateSize({ cellWidth, cellHeight })

    const randomColor = Math.floor(Math.random()*16777215).toString(16)
    this.element.style.backgroundColor = "#" + randomColor
  }

  updateSize({ cellWidth, cellHeight }) {
    if(this.centred)
      return this.updateByCenter({ cellWidth, cellHeight })

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

  setBgColor(r = 0, g = 0, b = 0, a = 1) {
    this.element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
  }

  hidden(){
    this.element.style.display = "none"
  }

  show(){
    this.element.style.display = "block"
  }
}

export { Grid }
