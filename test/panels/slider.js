import { Column, Grid, Panel, SliderMixin, SpriteBg } from "../../src/index.js";

export function DemoSlider() {
    const panel = new Panel
    panel.debug(true)

    const firstColumn = new VertSlider
    const secondColumn = new HorSlider
    secondColumn.columnNumber = 2
    panel.addChild(firstColumn, secondColumn)

    firstColumn.debug(true)

    return panel
}

function VertSlider() {
    const slider = new Column
    SliderMixin(slider)
    slider.isVertical = true
    slider.autoPosition = true

    const grid = new Grid
    grid.tillingSizes.y = 10
    const blackBg = new SpriteBg
    blackBg.fillColor('#171612')
    grid.setBg(blackBg)
    slider.strip.addChild(grid)

    const redGrid = new Grid
    redGrid.tillingSizes.y = 13
    const redBg = new SpriteBg
    redBg.fillColor('#aa1612')
    redGrid.setBg(redBg)
    slider.strip.addChild(redGrid)

    return slider
}

function HorSlider() {
    const slider = new Column
    SliderMixin(slider)
    slider.autoPosition = true

    const grid = new Grid
    grid.tillingSizes.x = 18
    const blackBg = new SpriteBg
    blackBg.fillColor('#174412')
    grid.setBg(blackBg)
    slider.strip.addChild(grid)

    const redGrid = new Grid
    redGrid.tillingSizes.x = 21
    const redBg = new SpriteBg
    redBg.fillColor('#aa1612')
    redGrid.setBg(redBg)
    slider.strip.addChild(redGrid)

    return slider
}