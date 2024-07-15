import { UIMemberFactory } from "../src/ui-member.js"

import { RootGrid } from "../src/root-grid.js"

import { Stats } from './stats.js'

import { SwitchPanel } from "./switch-panel.js"
import { DemoBackground, DemoGrid, DemoPanel, DemoText } from "./demo-panels.js"
import { ListPanels } from "./list.js"

import switchEvent from "./switch-panels-event.js"
import { Panel } from "../src/panel.js"
import { Assets } from "pixi.js"

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild( stats.dom );

function animate() {
    stats.begin()
    stats.end()
    requestAnimationFrame(animate)
}

requestAnimationFrame( animate )

const member = new UIMemberFactory
window.__PIXI_APP__ = member.pixiApp // Pixi.js DevTools

await Assets.load('Pixel.ttf')
const background3x3 = await Assets.load('background3x3.png')
const bgInput = await Assets.load('bgInput3x3.png')


const panels = new Map([
    ["Grid", new DemoGrid],
    ["Panel", new DemoPanel],
    ["Background", new DemoBackground(background3x3)],
    ["Text", new DemoText(bgInput)]
])
const listPanels = new ListPanels(panels)

setTimeout(listPanels.hideAll, 0)

member.subscribe(switchEvent, ({ state: namePanel }) => {
    listPanels.hideAll()
    listPanels.showPanel(namePanel)
})

member.rootGrid.addChild(listPanels)
member.rootGrid.addChild(new SwitchPanel(member, [...panels.keys()]))