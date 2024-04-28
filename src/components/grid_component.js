import { SubComponent } from "./sub_component"

class GridComponent extends SubComponent {
    constructor (name, parent) {
        super(name)

        if(!(parent instanceof Component))
            throw TypeError("The parent of this component has to be Component!")
        
        this.parent = parent
    }

    updateSize() {
        
    }
}

export { GridComponent }