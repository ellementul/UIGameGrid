import { Assets } from "pixi.js"
import { Grid, NineTillingBg, SpriteBg, Text, Input, Panel } from "../../src/index.js"

export function DemoText() {
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
    inputPanel.setBg(new NineTillingBg(Assets.get("bgInput")))
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