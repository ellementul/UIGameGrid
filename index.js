class Grid {
  constructor(baseLength) {
    this.baseLength = baseLength || 20
    this.cell = {
      height: 0,
      width: 0
    }
    this.computeCells()

    window.addEventListener("resize", () => {
      this.computeCells()
      console.log(this.cell)
    })
    console.log(this.cell)
  }

  computeCells() {
    const baseSide = window.screen.height < window.screen.width ? "height" : "width"
    const otherSide = window.screen.height < window.screen.width ? "width" : "height"
 
    this.cell[baseSide] = window.screen[baseSide] / this.baseLength
 
    this.cell[otherSide] = window.screen[otherSide] / Math.floor(window.screen[otherSide] / this.cell[baseSide])
  }
}

class Box {
  constructor({ cellWidth, cellHeight }, { top, right, bottom, left, centred = false }) {

  }

  updateSize({ cellWidth, cellHeight }) {

  }
}

export { Grid }
