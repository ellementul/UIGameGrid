import { Component } from "./component.js"
import { RenderComponent } from "./render_component.js"

const subComponentsSymbol = Symbol()

class SubComponent extends RenderComponent {
    constructor ({ parent, name, uniqName }) {
        super({ parent, uniqName })

        if(!Component.is(parent))
            throw TypeError("The parent of this component has to be Component!")
        
        if(SubComponent.is(parent))
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

const subComponentType = "Symbol_6daac273-9bea-4f9e-9af2-90326225efa3"
SubComponent.prototype.subComponentType = subComponentType
SubComponent.is = component => component && typeof component === "object" && component.subComponentType === subComponentType

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