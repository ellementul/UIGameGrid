import { Grid, Input, Panel, SpriteBg, TillingBg, Text, NineTillingBg } from "../src/index.js"


export function DemoGrid() {
    const demoGrid = new Grid
    demoGrid.tillingPosition.set(1,1)
    demoGrid.tillingSizes.x = 8
    demoGrid.tillingSizes.y = 8  
    demoGrid.debug(true)

    const demoSubGrid = new Grid
    demoSubGrid.subTilling = 2
    demoSubGrid.tillingPosition.set(1,1)
    demoSubGrid.tillingSizes.x = 8
    demoSubGrid.tillingSizes.y = 8
    demoSubGrid.debug(true)

    demoGrid.addChild(demoSubGrid)

    return demoGrid
}

export function DemoPanel() {
    const demoPanel = new Panel
    demoPanel.debug(true)

    const centerPanel = new Panel
    centerPanel.subTilling = 2
    centerPanel.debug(true)
    demoPanel.addChild(centerPanel)


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

export function DemoBackground(background) {
    const demoPanel = new Panel

    const centerPanel = new Panel
    centerPanel.setBg(new TillingBg(background))
    demoPanel.addChild(centerPanel)


    const topPanel = new Panel
    topPanel.subTilling = 2
    topPanel.posizes.top = 0
    topPanel.posizes.bottom = 1
    topPanel.setBg(new NineTillingBg(background))
    demoPanel.addChild(topPanel)

    const leftPanel = new Panel
    leftPanel.subTilling = 2
    leftPanel.posizes.left = 0
    leftPanel.posizes.right = 1
    leftPanel.setBg(new NineTillingBg(background))
    demoPanel.addChild(leftPanel)

    const leftTopAngle = new Panel
    leftTopAngle.subTilling = 2
    leftTopAngle.posizes.left = 0
    leftTopAngle.posizes.right = 1
    leftTopAngle.posizes.top = 0
    leftTopAngle.posizes.bottom = 1
    leftTopAngle.setBg(background)
    demoPanel.addChild(leftTopAngle)


    const rightBottomAngle = new Panel
    rightBottomAngle.subTilling = 2
    rightBottomAngle.posizes.left = 1
    rightBottomAngle.posizes.right = 0
    rightBottomAngle.posizes.top = 1
    rightBottomAngle.posizes.bottom = 0
    rightBottomAngle.setBg(new SpriteBg(background))
    demoPanel.addChild(rightBottomAngle)

    return demoPanel
}

export function DemoText(bgInput) {
    const demoGrid = new Grid
    demoGrid.tillingPosition.set(1,1)
    demoGrid.tillingSizes.x = 8
    demoGrid.tillingSizes.y = 8
    const blackBg = new SpriteBg
    blackBg.fillColor('#171612')
    demoGrid.setBg(blackBg)

    const inputPanel = new Panel
    inputPanel.subTilling = 4
    inputPanel.posizes.top = 0
    inputPanel.posizes.bottom = 1
    inputPanel.posizes.right = 0.5
    inputPanel.posizes.left = 0.5
    inputPanel.setBg(new NineTillingBg(bgInput))
    demoGrid.addChild(inputPanel)

    const input = new Input({
        placeholder: "Enter Text"
    })
    inputPanel.addChild(input)

    const textPanel = new Panel
    textPanel.subTilling = 2
    textPanel.posizes.top = 2
    textPanel.posizes.right = 0.5
    textPanel.posizes.left = 0.5
    textPanel.posizes.bottom = 0.5
    demoGrid.addChild(textPanel)

    const text = new Text({
        text:'Hello hell!\n',
        style:{
            fontFamily:'Pixel',
            fill: 'red',
        }
    })
    text.anchor.y = 0
    text.padding = 0.5
    textPanel.addChild(text)
    
    input.onEnter.connect(() => {
        text.text = text.text + input.value
        input.value = ''
    })

    return demoGrid
}
