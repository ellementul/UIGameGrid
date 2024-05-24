import { GridFactory, GridComponent, CellComponent, SubComponent } from "../index.js"

export function draw() {
    const UI = new GridFactory()
    UI.grid.showDebugGrid()

    const cell = new CellComponent({
        parent: UI.grid, 
        name: "cell"
    })

    cell.setBgColor("red")
}


