import { Column, Panel, Row } from "../../src/index.js"

export function DemoPanel() {
    const demoPanel = new Panel
    demoPanel.debug(true)

    const centerPanel = new Panel
    centerPanel.debug(true)
    demoPanel.addChild(centerPanel)

    const centerPanelWithSizes = new Panel
    centerPanelWithSizes.subTilling = 2
    centerPanelWithSizes.resetPosizes()
    centerPanelWithSizes.tillingSizes.set(22,22)
    centerPanelWithSizes.debug(true)
    centerPanel.addChild(centerPanelWithSizes)

    const column = new Column
    column.subTilling = 2
    column.debug(true)
    centerPanelWithSizes.addChild(column)

    const row = new Row
    row.subTilling = 2
    row.debug(true)
    column.addChild(row)

    const topPanel = new Panel
    topPanel.subTilling = 3
    topPanel.posizes.top = 0
    topPanel.posizes.bottom = 1
    topPanel.debug(true)
    demoPanel.addChild(topPanel)

    const bottomPanel = new Panel
    bottomPanel.subTilling = 3
    bottomPanel.posizes.top = 1
    bottomPanel.posizes.bottom = 0
    bottomPanel.debug(true)
    demoPanel.addChild(bottomPanel)

    const leftPanel = new Panel
    leftPanel.subTilling = 3
    leftPanel.posizes.left = 0
    leftPanel.posizes.right = 1
    leftPanel.debug(true)
    demoPanel.addChild(leftPanel)

    const rightPanel = new Panel
    rightPanel.subTilling = 3
    rightPanel.posizes.left = 1
    rightPanel.posizes.right = 0
    rightPanel.debug(true)
    demoPanel.addChild(rightPanel)

    const leftTopAngle = new Panel
    leftTopAngle.subTilling = 4
    leftTopAngle.posizes.left = 0
    leftTopAngle.posizes.right = 1
    leftTopAngle.posizes.top = 0
    leftTopAngle.posizes.bottom = 1
    leftTopAngle.debug(true)
    demoPanel.addChild(leftTopAngle)

    const rightTopAngle = new Panel
    rightTopAngle.subTilling = 4
    rightTopAngle.posizes.left = 1
    rightTopAngle.posizes.right = 0
    rightTopAngle.posizes.top = 0
    rightTopAngle.posizes.bottom = 1
    rightTopAngle.debug(true)
    demoPanel.addChild(rightTopAngle)

    return demoPanel
}