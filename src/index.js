import { Application, Graphics } from "pixi.js"
import { Viewport } from 'pixi-viewport'
import { Grid } from "./grid.js"

export async function UIFactory() {
    

    
    viewport
        .drag()
        // .pinch()
        // .wheel()
        // .decelerate()

    const grid = new Grid
    viewport.addChild(grid)

    const graphics = new Graphics()
        .rect(0, 0, 50, 50)
        .fill(0xFFFFFF)
        .rect(50, 50, 50, 50)
        .fill(0xFFFFFF)

    const texture = await app.renderer.extract.texture(graphics)
    grid.setBackground(texture).setTileSize(32)

    return {
        Grid
    }
}