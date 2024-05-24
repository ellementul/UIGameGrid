import { ComponentsStore } from './uniq_component_store.js'
import { RenderComponent } from './components/render_component.js'
import { GridComponent } from './components/grid_component.js'


const DEFAULT_SUBDIVIDE_MAIN_GRID = 20

class GridFactory {
    constructor({ subdivideLevelGrid, element = document.body } = {}) {

        this.component = new RenderComponent({ element })
        this.component.componentsStore = new ComponentsStore
        this.component.setTop(0)
        this.component.setLeft(0)

        this.grid = new GridComponent({ 
            parent: this.component, 
            name: "mainGrid",
            subdivideLevel: subdivideLevelGrid || DEFAULT_SUBDIVIDE_MAIN_GRID
        })

        this.updateSize()
        

        window.addEventListener("resize", () => this.updateSize())
    }

    computeSize() {
        this.component.setWidth(window.innerWidth)
        this.component.setHeight(window.innerHeight)
    }

    updateSize() {
        this.computeSize()

        this.grid.updateSize()
    }
}

export { GridFactory }