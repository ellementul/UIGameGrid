import { Component } from "./component.js"

class SubComponent extends Component {
    constructor (name, parent) {
        super(name)

        if(!(parent instanceof Component))
            throw TypeError("The parent of this component has to be Component!")
        
        this.parent = parent
    }
}

export { SubComponent }