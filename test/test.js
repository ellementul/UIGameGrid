import { Application, Graphics } from "pixi.js"

import { RootGrid } from "../src/root-grid.js"

import { Stats } from './stats.js'
import { Grid } from "../src/grid.js"
import { Panel } from "../src/panel.js"
import { Button, ButtonContainer } from "@pixi/ui"



const stats = new Stats()
stats.showPanel(0)
document.body.appendChild( stats.dom );

function animate() {
    stats.begin()
    stats.end()
    requestAnimationFrame(animate)
}

requestAnimationFrame( animate )

document.body.style.margin = "0px 0px 0px 0px"

const app = new Application()
await app.init({ resizeTo: window, hello: true })
document.body.appendChild(app.canvas)

const rootGrid = new RootGrid(app)
app.stage.addChild(rootGrid)
rootGrid.setBgDebug()

const panel = new Panel
panel.setBgDebug()
panel.posizes.top = 0
rootGrid.addChild(panel)

const img = new Graphics()
img.rect(0, 0, 100, 50, 15)
img.fill(0xFFFFFF)


const button = new ButtonContainer(img)
panel.addChild(button)

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


window.__PIXI_APP__ = app // Pixi.js DevTools