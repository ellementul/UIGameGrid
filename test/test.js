import { Application, Graphics } from "pixi.js"

import { RootGrid } from "../src/root-grid.js"

import { Stats } from './stats.js'
import { Grid } from "../src/grid.js"
import { Panel } from "../src/panel.js"



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

const grid = new Grid
grid.setBgDebug()
grid.subTilling = 2
grid.tillingSizes.width = 8
grid.tillingSizes.height = 8
grid.tillingPosition.set(1, 1)
rootGrid.addChild(grid)

let subGrid = new Grid
subGrid.setBgDebug()
subGrid.subTilling = 2
subGrid.tillingSizes.width = 8
subGrid.tillingSizes.height = 8
subGrid.tillingPosition.set(1, 1)
grid.addChild(subGrid)

const panel = new Panel
panel.setBgDebug()
panel.posizes.top = -1
panel.posizes.left = 6
rootGrid.addChild(panel)

subGrid = new Grid
subGrid.setBgColor('red')
subGrid.tillingSizes.width = 1
subGrid.tillingSizes.height = 1
subGrid.tillingPosition.set(23, 0)
panel.addChild(subGrid)

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