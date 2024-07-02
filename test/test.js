import { Application, Graphics, Texture } from "pixi.js"

import { RootGrid } from "../src/root-grid.js"

import { Stats } from './stats.js'
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

const grid = new RootGrid(app)
app.stage.addChild(grid)

grid.setBackgroundDebug()

let panel = new Panel({ renderer: app.renderer })
grid.addChild(panel)
panel.setPosizes({ left: 1, right: -1, top: 1, bottom: 2 })
panel.setBackgroundColor(0xFF)


panel = new Panel({ renderer: app.renderer })
grid.addChild(panel)
panel.setPosizes({ left: -1, right: 1, top: 2, bottom: 1 })
panel.setBackgroundColor(0xFF)


panel = new Panel({ renderer: app.renderer })
grid.addChild(panel)
panel.setPosizes({ left: 1, right: 2, top: -1, bottom: 1 })
panel.setBackgroundColor(0xFF00)

panel = new Panel({ renderer: app.renderer })
grid.addChild(panel)
panel.setPosizes({ left: 2, right: 1, top: 1, bottom: -1 })
panel.setBackgroundColor(0xFF00)

panel = new Panel({ renderer: app.renderer })
grid.addChild(panel)
panel.setPosizes({ left: 2, right: 2, top: 2, bottom: 2 })
panel.setBackgroundColor(0xFF0000)


window.__PIXI_APP__ = app // Pixi.js DevTools