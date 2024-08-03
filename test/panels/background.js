import { Assets } from "pixi.js"
import { Column, NineTillingBg, Panel, Row, SpriteBg, TillingBg } from "../../src/index.js"

export function DemoBackground() {
    const demoPanel = new Panel

    const centerPanel = new Panel
    const bg = new TillingBg(Assets.get("bgButton"))
    centerPanel.setBg(bg)
    demoPanel.addChild(centerPanel)

    const centerPanelWithSizes = new Panel
    centerPanelWithSizes.subTilling = 2
    centerPanelWithSizes.resetPosizes()
    centerPanelWithSizes.tillingSizes.set(22,22)
    centerPanelWithSizes.setBg(new NineTillingBg(Assets.get("bgButton")))
    centerPanel.addChild(centerPanelWithSizes)

    const column = new Column
    column.setBg(new NineTillingBg(Assets.get("bgButton")))
    centerPanelWithSizes.addChild(column)

    const row = new Row
    row.setBg(new NineTillingBg(Assets.get("bgButton")))
    column.addChild(row)


    const topPanel = new Panel
    topPanel.subTilling = 2
    topPanel.posizes.top = 0
    topPanel.posizes.bottom = 1
    topPanel.setBg(new NineTillingBg(Assets.get("bgButton")))
    demoPanel.addChild(topPanel)

    const leftPanel = new Panel
    leftPanel.subTilling = 2
    leftPanel.posizes.left = 0
    leftPanel.posizes.right = 1
    leftPanel.setBg(new NineTillingBg(Assets.get("bgButton")))
    demoPanel.addChild(leftPanel)

    const leftTopAngle = new Panel
    leftTopAngle.subTilling = 2
    leftTopAngle.posizes.left = 0
    leftTopAngle.posizes.right = 1
    leftTopAngle.posizes.top = 0
    leftTopAngle.posizes.bottom = 1
    leftTopAngle.setBg(Assets.get("bgButton"))
    demoPanel.addChild(leftTopAngle)


    const rightBottomAngle = new Panel
    rightBottomAngle.subTilling = 2
    rightBottomAngle.posizes.left = 1
    rightBottomAngle.posizes.right = 0
    rightBottomAngle.posizes.top = 1
    rightBottomAngle.posizes.bottom = 0
    rightBottomAngle.setBg(new SpriteBg(Assets.get("bgButton")))
    demoPanel.addChild(rightBottomAngle)

    return demoPanel
}