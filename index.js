class Grid {
  constructor(baseLength) {
    baseLength ||= 20
    console.log(baseLength)
  }
}

class Box {
  constructor({ cellWidth, cellHeight }, { top, right, bottom, left, centred = false }) {

  }

  updateSize({ cellWidth, cellHeight }) {

  }
}

export { Grid }
