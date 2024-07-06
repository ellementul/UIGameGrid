import { UIMemberFactory } from "../src/ui-member.js"

import { RootGrid } from "../src/root-grid.js"

import { Stats } from './stats.js'

import { SwitchPanel } from "./switch-panel.js"
import { DemoGrid, DemoPanel } from "./demo-panels.js"
import { ListPanels } from "./list.js"

import switchEvent from "./switch-panels-event.js"

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

const listPanels = new ListPanels(new Map([
    ["Grid", new DemoGrid],
    ["Panel", new DemoPanel]
]))

setTimeout(listPanels.hideAll, 0)

member.subscribe(switchEvent, ({ state: namePanel }) => {
    listPanels.hideAll()
    listPanels.showPanel(namePanel)
})

member.rootGrid.addChild(listPanels)
member.rootGrid.addChild(new SwitchPanel(member))


