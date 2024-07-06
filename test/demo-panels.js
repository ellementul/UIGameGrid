import { Grid, Panel } from "../src/index.js"

export function DemoGrid() {
    const demoGrid = new Grid
    demoGrid.tillingPosition.set(1,1)
    demoGrid.tillingSizes.width = 8
    demoGrid.tillingSizes.height = 8  
    demoGrid.setBgDebug()

    const demoSubGrid = new Grid
    demoSubGrid.subTilling = 2
    demoSubGrid.tillingPosition.set(1,1)
    demoSubGrid.tillingSizes.width = 8
    demoSubGrid.tillingSizes.height = 8
    demoSubGrid.setBgDebug()

    demoGrid.addChild(demoSubGrid)

    return demoGrid
}

export function DemoPanel() {
    const demoPanel = new Panel
    demoPanel.setBgDebug()

    const centerPanel = new Panel
    centerPanel.subTilling = 2
    centerPanel.setBgDebug()
    demoPanel.addChild(centerPanel)


    const topPanel = new Panel
    topPanel.subTilling = 3
    topPanel.posizes.top = 0
    topPanel.posizes.bottom = 1
    topPanel.setBgDebug()
    demoPanel.addChild(topPanel)

    const bottomPanel = new Panel
    bottomPanel.subTilling = 3
    bottomPanel.posizes.top = 1
    bottomPanel.posizes.bottom = 0
    bottomPanel.setBgDebug()
    demoPanel.addChild(bottomPanel)

    const leftPanel = new Panel
    leftPanel.subTilling = 3
    leftPanel.posizes.left = 0
    leftPanel.posizes.right = 1
    leftPanel.setBgDebug()
    demoPanel.addChild(leftPanel)

    const rightPanel = new Panel
    rightPanel.subTilling = 3
    rightPanel.posizes.left = 1
    rightPanel.posizes.right = 0
    rightPanel.setBgDebug()
    demoPanel.addChild(rightPanel)

    const leftTopAngle = new Panel
    leftTopAngle.subTilling = 4
    leftTopAngle.posizes.left = 0
    leftTopAngle.posizes.right = 1
    leftTopAngle.posizes.top = 0
    leftTopAngle.posizes.bottom = 1
    leftTopAngle.setBgDebug()
    demoPanel.addChild(leftTopAngle)

    const rightTopAngle = new Panel
    rightTopAngle.subTilling = 4
    rightTopAngle.posizes.left = 1
    rightTopAngle.posizes.right = 0
    rightTopAngle.posizes.top = 0
    rightTopAngle.posizes.bottom = 1
    rightTopAngle.setBgDebug()
    demoPanel.addChild(rightTopAngle)

    return demoPanel
}

export function DemoBackground(background) {
    const demoPanel = new Panel
    demoPanel.setBgDebug()

    const centerPanel = new Panel
    centerPanel.subTilling = 2
    centerPanel.setTillingBg(background)
    demoPanel.addChild(centerPanel)


    const topPanel = new Panel
    topPanel.subTilling = 2
    topPanel.posizes.top = 0
    topPanel.posizes.bottom = 1
    topPanel.setTillingBg(background)
    demoPanel.addChild(topPanel)

    const bottomPanel = new Panel
    bottomPanel.subTilling = 2
    bottomPanel.posizes.top = 1
    bottomPanel.posizes.bottom = 0
    bottomPanel.setBgDebug()
    demoPanel.addChild(bottomPanel)

    const leftPanel = new Panel
    leftPanel.subTilling = 2
    leftPanel.posizes.left = 0
    leftPanel.posizes.right = 1
    leftPanel.setTillingBg(background)
    demoPanel.addChild(leftPanel)

    const rightPanel = new Panel
    rightPanel.subTilling = 2
    rightPanel.posizes.left = 1
    rightPanel.posizes.right = 0
    rightPanel.setBgDebug()
    demoPanel.addChild(rightPanel)

    const leftTopAngle = new Panel
    leftTopAngle.subTilling = 2
    leftTopAngle.posizes.left = 0
    leftTopAngle.posizes.right = 1
    leftTopAngle.posizes.top = 0
    leftTopAngle.posizes.bottom = 1
    leftTopAngle.setTillingBg(background)
    demoPanel.addChild(leftTopAngle)

    const rightTopAngle = new Panel
    rightTopAngle.subTilling = 2
    rightTopAngle.posizes.left = 1
    rightTopAngle.posizes.right = 0
    rightTopAngle.posizes.top = 0
    rightTopAngle.posizes.bottom = 1
    rightTopAngle.setBgDebug()
    demoPanel.addChild(rightTopAngle)

    return demoPanel
}
