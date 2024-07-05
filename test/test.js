import { Application, Graphics, Text } from "pixi.js"
import { UIMemberFactory } from "../src/ui-member.js"

import { RootGrid } from "../src/root-grid.js"

import { Stats } from './stats.js'
import { Panel } from "../src/panel.js"
import { ButtonContainer } from "@pixi/ui"
import { TillingBackgroundMixin } from "../src/background-mixin.js"
import { Grid } from "../src/grid.js"

import switchEvent from "./switch-panels-event.js"
import { SwitchPanel } from "./switch-panel.js"

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

const rootGrid = new RootGrid(member.pixiApp)
member.pixiApp.stage.addChild(rootGrid)
rootGrid.setBgDebug()

rootGrid.addChild(new SwitchPanel(member))

member.subscribe(switchEvent, console.log)





// panel.setPosizes({ left: 1, right: -1, top: 1, bottom: 2 })
// panel.setBackgroundColor(0xFF)
// 


// panel = new Panel({ renderer: app.renderer })
// panel.setPosizes({ left: -1, right: 1, top: 2, bottom: 1 })
// panel.setBackgroundColor(0xFF)
// grid.addChild(panel)

// panel = new Panel({ renderer: app.renderer })
// panel.setPosizes({ left: 1, right: 2, top: -1, bottom: 1 })
// panel.setBackgroundColor(0xFF00)
// grid.addChild(panel)

// panel = new Panel({ renderer: app.renderer })
// panel.setPosizes({ left: 2, right: 1, top: 1, bottom: -1 })
// panel.setBackgroundColor(0xFF00)
// grid.addChild(panel)

// panel = new Panel({ renderer: app.renderer })
// panel.setPosizes({ left: 2, right: 2, top: 2, bottom: 2 })
// panel.setBackgroundColor(0xFF0000)
// grid.addChild(panel)


// const graph = new Graphics
// graph.rect(0,0,200, 200).fill(0xFF00FF)
// .rect(0, 200, 200, 200).fill(0xFF66FF)
// .rect(0, 400, 200, 200).fill(0xFFBBFF)
// panel.addChild(graph)


