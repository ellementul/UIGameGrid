import { Component } from "./component.js"

const subComponentsSymbol = Symbol

class SubComponent extends Component {
    constructor ({ parent, name, uniqName }) {
        super({ parent, uniqName })

        if(!(parent instanceof Component))
            throw TypeError("The parent of this component has to be Component!")
        
        if(parent instanceof SubComponent)
            parent.addSubComponent(name, this)

        this.componentsStore = parent.componentsStore

        if(uniqName) {
            this.componentsStore.set(uniqName, this)
            this.uniqName = uniqName
        }

        this.parent = parent
        this[subComponentsSymbol] = new Components
    }

    destructor() {
        this[subComponentsSymbol].clear()
        if(this.uniqName) {
            this.componentsStore.delete(this.uniqName)
        }
        super.destructor()
    }

    addSubComponent(name, component) {
        this[subComponentsSymbol].set(name, component)
    }

    clear() {
        this[subComponentsSymbol].clear()
    }

    updateSize() {
        this[subComponentsSymbol].forEach(subComponent => subComponent.updateSize())
    }
}

class Components extends Map {
    set(name, component) {

        if(this.has(name))
            throw new Error(`The subComponent with "${name}" name exists already!`)

        if(!(component instanceof SubComponent))
            throw TypeError("The subComponent has to be SubComponent instance!")

        super.set(name, component)
    }

    delete(name) {
        if(!this.has(name))
            return

        this.get(name).destructor()
        super.delete(name)
    }

    clear() {
        for (const [_, component] of this)
            component.destructor()

        super.clear()
    }
}

export { SubComponent }