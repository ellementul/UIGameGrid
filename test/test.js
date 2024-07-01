import { Application, Graphics } from "pixi.js"

import { RootGrid } from "../src/root-grid.js"

import { Stats } from './stats.js'



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

const graphics = new Graphics()
    .rect(0, 0, 50, 50)
    .fill(0xFFFFFF)
    .rect(50, 50, 50, 50)
    .fill(0xFFFFFF)

const texture = await app.renderer.extract.texture(graphics)
await grid.setBackgroundTiles(texture)


window.__PIXI_APP__ = app // Pixi.js DevTools